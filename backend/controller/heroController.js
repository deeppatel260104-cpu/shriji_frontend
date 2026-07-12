const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const BASE_URL = process.env.BASE_URL; // ✅ one place, used everywhere
const withBaseUrl = (path) => (path ? `${BASE_URL}${path}` : null);
console.log("BASE_URL", BASE_URL)
console.log("withBaseUrl('/uploads/hero/image.jpg')", withBaseUrl('/uploads/hero/image.jpg'))
// Get all hero images
const getHeroImage = catchAsyncError(async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM hero_section ORDER BY order_index ASC'
        );

        // ✅ Build full URL from stored relative path
        const data = rows.map(row => ({
            ...row,
            mobile_image: withBaseUrl(row.mobile_image),
            desktop_image: withBaseUrl(row.desktop_image),
        }));

        res.status(200).json({
            success: true,
            message: 'Hero image fetched successfully',
            data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch hero image',
            error: err.message
        });
    }
});

// Upload Hero Section Image
const uploadHeroImage = catchAsyncError(async (req, res) => {
    try {
        const mobile = req.files?.mobile_image?.[0];
        const desktop = req.files?.desktop_image?.[0];

        if (!mobile && !desktop)
            return res.status(400).json({ message: 'Please upload at least one hero image' });

        // ✅ Store only relative path in DB
        const mobilePath = mobile ? `/uploads/hero/${mobile.filename}` : '';
        const desktopPath = desktop ? `/uploads/hero/${desktop.filename}` : '';

        const { order_index = 0 } = req.body;

        await db.query(
            'INSERT INTO hero_section (mobile_image, desktop_image, order_index, is_active) VALUES (?, ?, ?, ?)',
            [mobilePath, desktopPath, order_index, 0]
        );

        res.status(201).json({
            success: true,
            message: 'Hero image uploaded',
            // ✅ Full URL in response
            mobile_image: withBaseUrl(mobilePath),
            desktop_image: withBaseUrl(desktopPath),
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload hero image',
            error: err.message
        });
    }
});

// Update Hero Image
const updateHero = catchAsyncError(async (req, res, next) => {
    try {
        const { id } = req.params;
        const fields = [];
        const values = [];

        if (req.files?.mobile_image?.[0]) {
            const mobilePath = `/uploads/hero/${req.files.mobile_image[0].filename}`; // ✅ relative path
            fields.push('mobile_image = ?');
            values.push(mobilePath);
        }
        if (req.files?.desktop_image?.[0]) {
            const desktopPath = `/uploads/hero/${req.files.desktop_image[0].filename}`; // ✅ relative path
            fields.push('desktop_image = ?');
            values.push(desktopPath);
        }
        if (req.body.order_index !== undefined) {
            fields.push('order_index = ?');
            values.push(req.body.order_index);
        }

        if (!fields.length)
            return res.status(400).json({ message: 'Nothing to update' });

        values.push(id);
        await db.query(`UPDATE hero_section SET ${fields.join(', ')} WHERE id = ?`, values);

        res.json({ success: true, message: 'Hero Image updated' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update hero image',
            error: err.message
        });
    }
});

// Toggle Active Status
const toggleHeroStatus = catchAsyncError(async (req, res, next) => {
    try {
        await db.query(
            'UPDATE hero_section SET is_active = NOT is_active WHERE id = ?',
            [req.params.id]
        );
        res.json({ success: true, message: 'Status toggled' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to toggle hero image status',
            error: err.message
        });
    }
});

// Delete Hero Image
const deleteHeroImage = catchAsyncError(async (req, res, next) => {
    try {
        await db.query('DELETE FROM hero_section WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Hero image deleted' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete hero image',
            error: err.message
        });
    }
});

module.exports = { getHeroImage, uploadHeroImage, updateHero, toggleHeroStatus, deleteHeroImage };
