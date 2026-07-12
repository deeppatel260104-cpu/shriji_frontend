const db = require('../config/db.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const getSubcategoriesByCategory = catchAsyncError(async (req, res, next) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM subcategories WHERE category_id = ? ORDER BY created_at ASC',
            [req.params.categoryId]
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch subcategories',
            error: err.message
        });
    }
})

const createSubcategory = catchAsyncError(async (req, res) => {
    try {
        const { category_id, name } = req.body;

        if (!category_id || !name)
            return res.status(400).json({ message: 'category_id and name are required' });

        // Verify parent category exists
        const [cat] = await db.query('SELECT id FROM categories WHERE id = ?', [category_id]);
        if (!cat.length)
            return res.status(404).json({ message: 'Parent category not found' });

        const [result] = await db.query(
            'INSERT INTO subcategories (category_id, name) VALUES (?, ?)',
            [category_id, name]
        );

        res.status(201).json({ success: true, id: result.insertId, message: 'Subcategory created' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create subcategory',
            error: err.message
        });
    }
})

const updateSubcategory = catchAsyncError(async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name)
            return res.status(400).json({ message: 'Name is required' });

        const [result] = await db.query(
            'UPDATE subcategories SET name = ? WHERE id = ?',
            [name, id]
        );

        if (!result.affectedRows)
            return res.status(404).json({ message: 'Subcategory not found' });

        res.json({ success: true, message: 'Subcategory updated' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update subcategory',
            error: err.message
        });
    }
})

const deleteSubcategory = catchAsyncError(async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM subcategories WHERE id = ?',
            [req.params.id]
        );

        if (!result.affectedRows)
            return res.status(404).json({ message: 'Subcategory not found' });

        res.json({ success: true, message: 'Subcategory deleted' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete subcategory',
            error: err.message
        });
    }
})

module.exports = { getSubcategoriesByCategory, createSubcategory, updateSubcategory, deleteSubcategory };