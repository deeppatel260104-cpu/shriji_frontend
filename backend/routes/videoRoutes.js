const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { getAllVideos,
     getVideosByCategory,
    getVideosBySubcategory,
    uploadVideo,
    updateVideo,
    deleteVideo } = require("../controller/videoController");
router.get('/', isAuthenticatedUser, getAllVideos);              
router.get('/category/:categoryId', getVideosByCategory);
router.get('/subcategory/:subcategoryId', getVideosBySubcategory);
router.post('/', isAuthenticatedUser, uploadVideo);
router.put('/:id', isAuthenticatedUser, updateVideo);
router.delete('/:id', isAuthenticatedUser, deleteVideo);

module.exports = router;