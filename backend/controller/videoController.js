const db = require('../config/db');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const { get } = require('../routes/imageRoutes.js');

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;

const getAllVideos = catchAsyncError(async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM videos ORDER BY created_at DESC'
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch all videos',
            error: err.message
        });
    }
});

const getVideosByCategory = catchAsyncError(async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM videos WHERE category_id = ? AND subcategory_id IS NULL ORDER BY created_at DESC',
            [req.params.categoryId]
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch videos by category',
            error: err.message
        });
    }
})

const getVideosBySubcategory = catchAsyncError(async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM videos WHERE subcategory_id = ? ORDER BY created_at DESC',
            [req.params.subcategoryId]
        );
        res.json({ success: true, data: rows });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch videos by subcategory',
            error: err.message
        });
    }
})

const uploadVideo = catchAsyncError(async (req, res) => {
    try {
        const { category_id, subcategory_id, youtube_url, title } = req.body;

        if (!youtube_url || !youtubeRegex.test(youtube_url))
            return res.status(400).json({ message: 'Valid YouTube URL required' });

        if (!category_id && !subcategory_id)
            return res.status(400).json({ message: 'category_id or subcategory_id required' });

        await db.query(
            'INSERT INTO videos (category_id, subcategory_id, youtube_url, title) VALUES (?, ?, ?, ?)',
            [category_id || null, subcategory_id || null, youtube_url, title || null]
        );

        res.status(201).json({ success: true, message: 'Video added' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to upload video',
            error: err.message
        });
    }
})

const updateVideo = catchAsyncError(async (req, res) => {
    try {
        const { youtube_url, title, category_id, subcategory_id } = req.body;
        const { id } = req.params;

        if (youtube_url && !youtubeRegex.test(youtube_url))
            return res.status(400).json({ message: 'Invalid YouTube URL' });

        const updates = [];
        const params = [];

        if (youtube_url !== undefined) {
            updates.push('youtube_url = ?');
            params.push(youtube_url);
        }

        if (title !== undefined) {
            updates.push('title = ?');
            params.push(title || null);
        }

        if (category_id !== undefined) {
            updates.push('category_id = ?', 'subcategory_id = ?');
            params.push(category_id || null, null);
        } else if (subcategory_id !== undefined) {
            updates.push('subcategory_id = ?');
            params.push(subcategory_id || null);
        }

        if (updates.length === 0)
            return res.status(400).json({ message: 'No fields provided to update' });

        await db.query(`UPDATE videos SET ${updates.join(', ')} WHERE id = ?`, [...params, id]);

        res.json({ success: true, message: 'Video updated' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update video',
            error: err.message
        });
    }
})
const deleteVideo = catchAsyncError(async (req, res)=> {
    try {
        await db.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Video deleted' });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch hero image',
            error: err.message
        });
    }
});

module.exports = {
    getAllVideos,
    getVideosByCategory,
    getVideosBySubcategory, 
    uploadVideo, 
    updateVideo,
    deleteVideo
}
