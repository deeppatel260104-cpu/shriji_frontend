const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const ensurePackageFaqsTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS package_faqs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question VARCHAR(500) NOT NULL,
            answer TEXT NOT NULL,
            order_index INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
};

const getAllPackageFaqs = catchAsyncError(async (req, res) => {
    try {
        await ensurePackageFaqsTable();
        const [faqs] = await db.query('SELECT * FROM package_faqs ORDER BY order_index ASC, created_at DESC');

        res.json({ success: true, data: faqs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch FAQs', error: err.message });
    }
});

const getPackageFaqById = catchAsyncError(async (req, res) => {
    try {
        await ensurePackageFaqsTable();
        const [faqs] = await db.query('SELECT * FROM package_faqs WHERE id = ?', [req.params.id]);

        if (!faqs.length)
            return res.status(404).json({ success: false, message: 'FAQ not found' });

        res.json({ success: true, data: faqs[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get FAQ', error: err.message });
    }
});

const createPackageFaq = catchAsyncError(async (req, res) => {
    try {
        await ensurePackageFaqsTable();
        const { question, answer, order_index } = req.body;

        if (!question || !answer)
            return res.status(400).json({ success: false, message: 'Question and answer required' });

        const [result] = await db.query(
            'INSERT INTO package_faqs (question, answer, order_index) VALUES (?, ?, ?)',
            [question, answer, order_index || 0]
        );

        res.status(201).json({ success: true, message: 'FAQ created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create FAQ', error: err.message });
    }
});

const updatePackageFaq = catchAsyncError(async (req, res) => {
    try {
        await ensurePackageFaqsTable();
        const { question, answer, order_index } = req.body;
        const { id } = req.params;

        const fields = [];
        const values = [];

        if (question) { fields.push('question = ?'); values.push(question); }
        if (answer) { fields.push('answer = ?'); values.push(answer); }
        if (order_index !== undefined) { fields.push('order_index = ?'); values.push(order_index); }

        if (!fields.length)
            return res.status(400).json({ success: false, message: 'Nothing to update' });

        values.push(id);
        await db.query(`UPDATE package_faqs SET ${fields.join(', ')} WHERE id = ?`, values);

        res.json({ success: true, message: 'FAQ updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update FAQ', error: err.message });
    }
});

const deletePackageFaq = catchAsyncError(async (req, res) => {
    try {
        await ensurePackageFaqsTable();
        await db.query('DELETE FROM package_faqs WHERE id = ?', [req.params.id]);

        res.json({ success: true, message: 'FAQ deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete FAQ', error: err.message });
    }
});

module.exports = {
    getAllPackageFaqs,
    getPackageFaqById,
    createPackageFaq,
    updatePackageFaq,
    deletePackageFaq,
};
