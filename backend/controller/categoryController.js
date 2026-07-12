const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const ensurePinterestLinkColumn = async () => {
    const [columns] = await db.query("SHOW COLUMNS FROM categories LIKE 'pinterest_link'");

    if (!columns.length) {
        await db.query('ALTER TABLE categories ADD COLUMN pinterest_link VARCHAR(500) NULL');
    }
};

const BASE_URL = process.env.BASE_URL; // ✅ one place, used everywhere

const getAllCategories = catchAsyncError(async (req, res) => {
    try {
        await ensurePinterestLinkColumn();
        const [categories] = await db.query('SELECT * FROM categories ORDER BY created_at DESC');
        const [subcategories] = await db.query('SELECT * FROM subcategories');

        const data = categories.map(cat => ({
            ...cat,
            thumbnail_image: `${BASE_URL}${cat.thumbnail_image}`, // ✅ build full URL
            subcategories: subcategories.filter(s => s.category_id === cat.id),
        }));
        console.log("data", data)

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch categories', error: err.message });
    }
});

const createCategory = catchAsyncError(async (req, res) => {
    try {
        await ensurePinterestLinkColumn();
        const { name, slug, order_index, pinterest_link } = req.body;
        const thumbnail = req.file;

        if (!name || !thumbnail)
            return res.status(400).json({ message: 'Name and thumbnail required' });

        const thumbnailPath = `/uploads/categories/${thumbnail.filename}`; // ✅ store relative path
        console.log("thumbnailPath", thumbnailPath)
        const [result] = await db.query(
            'INSERT INTO categories (name, slug, order_index, thumbnail_image, pinterest_link) VALUES (?, ?, ?, ?, ?)',
            [
                name,
                slug || name.toLowerCase().replace(/\s+/g, '-'),
                order_index || 0,
                thumbnailPath, // ✅ save only path in DB
                pinterest_link || null
            ]
        );

        res.status(201).json({
            success: true,
            id: result.insertId,
            thumbnail_image: `${BASE_URL}${thumbnailPath}` // ✅ full URL in response
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create categories', error: err.message });
    }
});

const getCategoryById = catchAsyncError(async (req, res) => {
    try {
        await ensurePinterestLinkColumn();
        const [cats] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
        if (!cats.length)
            return res.status(404).json({ message: 'Category not found' });

        const [subcategories] = await db.query('SELECT * FROM subcategories WHERE category_id = ?', [req.params.id]);

        res.json({
            success: true,
            data: {
                ...cats[0],
                thumbnail_image: `${BASE_URL}${cats[0].thumbnail_image}`, // ✅ full URL
                subcategories
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get categories', error: err.message });
    }
});

const updateCategory = catchAsyncError(async (req, res) => {
    try {
        await ensurePinterestLinkColumn();
        const { name, slug, order_index, pinterest_link } = req.body;
        const { id } = req.params;

        const fields = [];
        const values = [];

        if (name) { fields.push('name = ?'); values.push(name); }
        if (slug) { fields.push('slug = ?'); values.push(slug); }
        if (order_index !== undefined) { fields.push('order_index = ?'); values.push(order_index); }
        if (pinterest_link !== undefined) { fields.push('pinterest_link = ?'); values.push(pinterest_link || null); }

        if (req.file) {
            const thumbnailPath = `/uploads/categories/${req.file.filename}`; // ✅ store relative path
            fields.push('thumbnail_image = ?');
            values.push(thumbnailPath);
        }

        if (!fields.length)
            return res.status(400).json({ message: 'Nothing to update' });

        values.push(id);
        await db.query(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, values);

        res.json({ success: true, message: 'Category updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update categories', error: err.message });
    }
});

const deleteCategory = catchAsyncError(async (req, res) => {
    try {
        await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete categories', error: err.message });
    }
});

module.exports = { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory };
