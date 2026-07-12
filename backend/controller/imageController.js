const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const BASE_URL = process.env.BASE_URL; // ✅ one place, used everywhere

let slideshowColumnReady = false;

const ensureSlideshowColumn = async () => {
    if (slideshowColumnReady) return;
    const columns = ['show_in_slideshow', 'show_in_mobile_slideshow'];
    for (const column of columns) {
        try {
            await db.query(
                `ALTER TABLE images
                 ADD COLUMN ${column} TINYINT(1) NOT NULL DEFAULT 0`
            );
        } catch (err) { 
            if (err.code !== 'ER_DUP_FIELDNAME' && err.code !== 'ER_DUPLICATE_COLUMN') {
                throw err;
            }
        }
    }
    slideshowColumnReady = true;
};

const normalizeBoolean = (value) => (
    value === true || value === 1 || value === '1' || value === 'true' || value === 'on' ? 1 : 0
);

const getAllImages = catchAsyncError(async (req, res) => {
    try {
        await ensureSlideshowColumn();
        const [rows] = await db.query(
            `SELECT id, category_id, subcategory_id, image_desktop, layout_type, order_index, show_in_slideshow, show_in_mobile_slideshow, uploaded_at
             FROM images
             ORDER BY category_id ASC, order_index ASC`
        );

        // ✅ Build full URL from stored relative path
        const data = rows.map(row => ({
            ...row,
            image_desktop: `${BASE_URL}${row.image_desktop}`,
        }));

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all images',
            error: err.message
        });
    }
});

const getImagesByCategory = catchAsyncError(async (req, res) => {
    try {
        await ensureSlideshowColumn();
        const [rows] = await db.query(
            `SELECT id, category_id, subcategory_id, image_desktop, layout_type, order_index, show_in_slideshow, show_in_mobile_slideshow, uploaded_at
             FROM images
             WHERE category_id = ? AND subcategory_id IS NULL
             ORDER BY order_index ASC`,
            [req.params.categoryId]
        );

        // ✅ Build full URL from stored relative path
        const data = rows.map(row => ({
            ...row,
            image_desktop: `${BASE_URL}${row.image_desktop}`,
        }));

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch images by category',
            error: err.message
        });
    }
});

const getImagesBySubcategory = catchAsyncError(async (req, res) => {
    try {
        await ensureSlideshowColumn();
        const [rows] = await db.query(
            `SELECT id, category_id, subcategory_id, image_desktop, layout_type, order_index, show_in_slideshow, show_in_mobile_slideshow, uploaded_at
             FROM images
             WHERE subcategory_id = ?
             ORDER BY order_index ASC`,
            [req.params.subcategoryId]
        );

        // ✅ Build full URL from stored relative path
        const data = rows.map(row => ({
            ...row,
            image_desktop: `${BASE_URL}${row.image_desktop}`,
        }));

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch image by subcategory',
            error: err.message
        });
    }
});
const uploadImage = catchAsyncError(async (req, res) => {
    console.log("========== UPLOAD IMAGE API START ==========");

    try {
        await ensureSlideshowColumn();
        console.log("📌 Request Body:", req.body);
        console.log("📌 Request Files:", req.files);

        const desktop = req.files?.image_desktop?.[0];

        console.log("📌 Desktop File:", desktop);

        if (!desktop) {
            console.log("❌ Desktop image not provided");

            return res.status(400).json({
                message: 'Desktop image required'
            });
        }

        const {
            category_id,
            subcategory_id,
            layout_type = 'full',
            order_index = 0,
            show_in_slideshow = 0,
            show_in_mobile_slideshow = 0
        } = req.body;
        const slideshowValue = normalizeBoolean(show_in_slideshow);
        const mobileSlideshowValue = normalizeBoolean(show_in_mobile_slideshow);

        console.log("📌 category_id:", category_id);
        console.log("📌 subcategory_id:", subcategory_id);
        console.log("📌 layout_type:", layout_type);
        console.log("📌 order_index:", order_index);
        console.log("📌 show_in_slideshow:", slideshowValue);
        console.log("📌 show_in_mobile_slideshow:", mobileSlideshowValue);

        if (!category_id && !subcategory_id) {
            console.log("❌ category_id and subcategory_id both missing");

            return res.status(400).json({
                message: 'category_id or subcategory_id required'
            });
        }

        if (!['full', 'half'].includes(layout_type)) {
            console.log("❌ Invalid layout_type:", layout_type);

            return res.status(400).json({
                message: 'layout_type must be full or half'
            });
        }

        // ✅ Store only relative path in DB
        const desktopPath = `/uploads/images/${desktop.filename}`;

        console.log("📌 Generated Desktop Path:", desktopPath);

        console.log("📌 Running INSERT Query...");

        const [result] = await db.query(
            `INSERT INTO images
             (category_id, subcategory_id, image_desktop, layout_type, order_index, show_in_slideshow, show_in_mobile_slideshow)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                category_id || null,
                subcategory_id || null,
                desktopPath,
                layout_type,
                order_index,
                slideshowValue,
                mobileSlideshowValue,
            ]
        );

        console.log("✅ Image Inserted Successfully");
        console.log("📌 Insert Result:", result);

        const fullImageUrl = `${BASE_URL}${desktopPath}`;

        console.log("📌 Full Image URL:", fullImageUrl);

        res.status(201).json({
            success: true,
            message: 'Image uploaded',
            image_desktop: fullImageUrl,
        });

        console.log("========== UPLOAD IMAGE API END ==========");
    } catch (err) {
        console.log("❌ Upload Image Error:", err);
        console.log("❌ Error Message:", err.message);

        res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: err.message
        });

        console.log("========== UPLOAD IMAGE API FAILED ==========");
    }
});

const updateImage = catchAsyncError(async (req, res, next) => {
    console.log("========== UPDATE IMAGE API START ==========");

    try {
        await ensureSlideshowColumn();
        const { id } = req.params;

        console.log("📌 Image ID:", id);
        console.log("📌 Request Body:", req.body);
        console.log("📌 Request Files:", req.files);

        console.log("📌 Fetching Existing Image...");

        const [rows] = await db.query(
            'SELECT * FROM images WHERE id = ?',
            [id]
        );

        console.log("📌 Existing Rows:", rows);

        if (!rows.length) {
            console.log("❌ Image not found");

            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        const existing = rows[0];

        console.log("📌 Existing Image Data:", existing);

        const newDesktop = req.files?.image_desktop?.[0];

        console.log("📌 New Desktop File:", newDesktop);

        // ✅ Store relative path if new file uploaded, else keep existing
        const desktopPath = newDesktop
            ? `/uploads/images/${newDesktop.filename}`
            : existing.image_desktop;

        console.log("📌 Final Desktop Path:", desktopPath);

        const resolvedCategoryId =
            req.body.category_id !== undefined
                ? req.body.category_id
                : existing.category_id;

        const resolvedSubcategoryId =
            req.body.subcategory_id !== undefined
                ? req.body.subcategory_id
                : existing.subcategory_id;

        const resolvedLayoutType =
            req.body.layout_type !== undefined
                ? req.body.layout_type
                : existing.layout_type;

        const resolvedOrderIndex =
            req.body.order_index !== undefined
                ? req.body.order_index
                : existing.order_index;
        const resolvedShowInSlideshow =
            req.body.show_in_slideshow !== undefined
                ? normalizeBoolean(req.body.show_in_slideshow)
                : normalizeBoolean(existing.show_in_slideshow);
        const resolvedShowInMobileSlideshow =
            req.body.show_in_mobile_slideshow !== undefined
                ? normalizeBoolean(req.body.show_in_mobile_slideshow)
                : normalizeBoolean(existing.show_in_mobile_slideshow);

        console.log("📌 Resolved Category ID:", resolvedCategoryId);
        console.log("📌 Resolved Subcategory ID:", resolvedSubcategoryId);
        console.log("📌 Resolved Layout Type:", resolvedLayoutType);
        console.log("📌 Resolved Order Index:", resolvedOrderIndex);
        console.log("📌 Resolved Show In Slideshow:", resolvedShowInSlideshow);
        console.log("📌 Resolved Show In Mobile Slideshow:", resolvedShowInMobileSlideshow);

        if (
            resolvedLayoutType &&
            !['full', 'half'].includes(resolvedLayoutType)
        ) {
            console.log("❌ Invalid layout_type:", resolvedLayoutType);

            return res.status(400).json({
                success: false,
                message: 'layout_type must be full or half'
            });
        }

        console.log("📌 Running UPDATE Query...");

        const [updateResult] = await db.query(
            `UPDATE images
             SET image_desktop  = ?,
                 category_id    = ?,
                 subcategory_id = ?,
                 layout_type    = ?,
                 order_index    = ?,
                 show_in_slideshow = ?,
                 show_in_mobile_slideshow = ?
             WHERE id = ?`,
            [
                desktopPath,
                resolvedCategoryId,
                resolvedSubcategoryId,
                resolvedLayoutType,
                resolvedOrderIndex,
                resolvedShowInSlideshow,
                resolvedShowInMobileSlideshow,
                id
            ]
        );

        console.log("✅ Image Updated Successfully");
        console.log("📌 Update Result:", updateResult);

        res.json({
            success: true,
            message: 'Image updated'
        });

        console.log("========== UPDATE IMAGE API END ==========");
    } catch (err) {
        console.log("❌ Update Image Error:", err);
        console.log("❌ Error Message:", err.message);

        res.status(500).json({
            success: false,
            message: 'Failed to update image',
            error: err.message
        });

        console.log("========== UPDATE IMAGE API FAILED ==========");
    }
});
const updateImageLayout = catchAsyncError(async (req, res) => {
    try {
        await ensureSlideshowColumn();
        const { layout_type, order_index, show_in_slideshow, show_in_mobile_slideshow } = req.body;
        const { id } = req.params;
        const fields = [];
        const values = [];

        if (layout_type) {
            if (!['full', 'half'].includes(layout_type))
                return res.status(400).json({ message: 'Invalid layout_type' });
            fields.push('layout_type = ?');
            values.push(layout_type);
        }
        if (order_index !== undefined) {
            fields.push('order_index = ?');
            values.push(order_index);
        }
        if (show_in_slideshow !== undefined) {
            fields.push('show_in_slideshow = ?');
            values.push(normalizeBoolean(show_in_slideshow));
        }
        if (show_in_mobile_slideshow !== undefined) {
            fields.push('show_in_mobile_slideshow = ?');
            values.push(normalizeBoolean(show_in_mobile_slideshow));
        }

        if (!fields.length) return res.status(400).json({ message: 'Nothing to update' });

        values.push(id);
        await db.query(`UPDATE images SET ${fields.join(', ')} WHERE id = ?`, values);
        res.json({ success: true, message: 'Layout updated' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update image layout',
            error: err.message
        });
    }
});

const reorderImages = catchAsyncError(async (req, res) => {
    try {
        const updates = req.body;
        if (!Array.isArray(updates) || !updates.length)
            return res.status(400).json({ message: 'Provide array of { id, order_index }' });

        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            for (const { id, order_index } of updates) {
                await conn.query('UPDATE images SET order_index = ? WHERE id = ?', [order_index, id]);
            }
            await conn.commit();
        } catch (e) {
            await conn.rollback();
            throw e;
        } finally {
            conn.release();
        }

        res.json({ success: true, message: 'Images reordered' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to reorder images',
            error: err.message
        });
    }
});

const deleteImage = catchAsyncError(async (req, res) => {
    try {
        await db.query('DELETE FROM images WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete image',
            error: err.message
        });
    }
});

module.exports = { getAllImages, getImagesByCategory, getImagesBySubcategory, uploadImage, updateImage, updateImageLayout, reorderImages, deleteImage };
