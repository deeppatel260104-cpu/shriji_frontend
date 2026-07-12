const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const ensureAddOnsTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS package_addons (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price VARCHAR(100) NOT NULL,
            order_index INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
};

const getAllAddOnPackages = catchAsyncError(async (req, res) => {
    try {
        await ensureAddOnsTable();
        const [addons] = await db.query('SELECT * FROM package_addons ORDER BY order_index ASC, created_at DESC');

        res.json({ success: true, data: addons });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch add-ons', error: err.message });
    }
});

const getAddOnPackageById = catchAsyncError(async (req, res) => {
    try {
        await ensureAddOnsTable();
        const [addons] = await db.query('SELECT * FROM package_addons WHERE id = ?', [req.params.id]);

        if (!addons.length)
            return res.status(404).json({ success: false, message: 'Add-on not found' });

        res.json({ success: true, data: addons[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get add-on', error: err.message });
    }
});

const createAddOnPackage = catchAsyncError(async (req, res) => {
    try {
        await ensureAddOnsTable();
        const { name, price, order_index } = req.body;

        if (!name || !price)
            return res.status(400).json({ success: false, message: 'Name and price required' });

        const [result] = await db.query(
            'INSERT INTO package_addons (name, price, order_index) VALUES (?, ?, ?)',
            [name, price, order_index || 0]
        );

        res.status(201).json({ success: true, message: 'Add-on created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create add-on', error: err.message });
    }
});

const updateAddOnPackage = catchAsyncError(async (req, res) => {
    try {
        await ensureAddOnsTable();
        const { name, price, order_index } = req.body;
        const { id } = req.params;

        const fields = [];
        const values = [];

        if (name) { fields.push('name = ?'); values.push(name); }
        if (price) { fields.push('price = ?'); values.push(price); }
        if (order_index !== undefined) { fields.push('order_index = ?'); values.push(order_index); }

        if (!fields.length)
            return res.status(400).json({ success: false, message: 'Nothing to update' });

        values.push(id);
        await db.query(`UPDATE package_addons SET ${fields.join(', ')} WHERE id = ?`, values);

        res.json({ success: true, message: 'Add-on updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update add-on', error: err.message });
    }
});

const deleteAddOnPackage = catchAsyncError(async (req, res) => {
    try {
        await ensureAddOnsTable();
        await db.query('DELETE FROM package_addons WHERE id = ?', [req.params.id]);

        res.json({ success: true, message: 'Add-on deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete add-on', error: err.message });
    }
});

module.exports = {
    getAllAddOnPackages,
    getAddOnPackageById,
    createAddOnPackage,
    updateAddOnPackage,
    deleteAddOnPackage,
};
