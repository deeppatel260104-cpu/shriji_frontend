const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');

const ensurePackagesTable = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS packages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tier VARCHAR(255) NOT NULL,
            price VARCHAR(100) NOT NULL,
            tagline VARCHAR(500) NULL,
            badge VARCHAR(100) NULL,
            features TEXT NOT NULL,
            cta VARCHAR(150) NULL,
            highlight TINYINT(1) DEFAULT 0,
            order_index INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `);
};

const getAllPackages = catchAsyncError(async (req, res) => {
    try {
        await ensurePackagesTable();
        const [packages] = await db.query('SELECT * FROM packages ORDER BY order_index ASC, created_at DESC');

        res.json({ success: true, data: packages });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch packages', error: err.message });
    }
});

const getPackageById = catchAsyncError(async (req, res) => {
    try {
        await ensurePackagesTable();
        const [packages] = await db.query('SELECT * FROM packages WHERE id = ?', [req.params.id]);

        if (!packages.length)
            return res.status(404).json({ success: false, message: 'Package not found' });

        res.json({ success: true, data: packages[0] });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to get package', error: err.message });
    }
});

const createPackage = catchAsyncError(async (req, res) => {
    try {
        await ensurePackagesTable();
        const { tier, price, tagline, badge, features, cta, highlight, order_index } = req.body;

        if (!tier || !price || !features)
            return res.status(400).json({ success: false, message: 'Tier, price and features required' });

        const [result] = await db.query(
            'INSERT INTO packages (tier, price, tagline, badge, features, cta, highlight, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                tier,
                price,
                tagline || null,
                badge || null,
                features,
                cta || `Book ${tier}`,
                Number(highlight) ? 1 : 0,
                order_index || 0
            ]
        );

        res.status(201).json({ success: true, message: 'Package created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create package', error: err.message });
    }
});

const updatePackage = catchAsyncError(async (req, res) => {
    try {
        await ensurePackagesTable();
        const { tier, price, tagline, badge, features, cta, highlight, order_index } = req.body;
        const { id } = req.params;

        const fields = [];
        const values = [];

        if (tier) { fields.push('tier = ?'); values.push(tier); }
        if (price) { fields.push('price = ?'); values.push(price); }
        if (tagline !== undefined) { fields.push('tagline = ?'); values.push(tagline || null); }
        if (badge !== undefined) { fields.push('badge = ?'); values.push(badge || null); }
        if (features) { fields.push('features = ?'); values.push(features); }
        if (cta !== undefined) { fields.push('cta = ?'); values.push(cta || null); }
        if (highlight !== undefined) { fields.push('highlight = ?'); values.push(Number(highlight) ? 1 : 0); }
        if (order_index !== undefined) { fields.push('order_index = ?'); values.push(order_index); }

        if (!fields.length)
            return res.status(400).json({ success: false, message: 'Nothing to update' });

        values.push(id);
        await db.query(`UPDATE packages SET ${fields.join(', ')} WHERE id = ?`, values);

        res.json({ success: true, message: 'Package updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update package', error: err.message });
    }
});

const deletePackage = catchAsyncError(async (req, res) => {
    try {
        await ensurePackagesTable();
        await db.query('DELETE FROM packages WHERE id = ?', [req.params.id]);

        res.json({ success: true, message: 'Package deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete package', error: err.message });
    }
});

module.exports = {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
};
