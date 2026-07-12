// routes/imageRoutes.js
const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { imageUpload } = require('../middleware/uploadMiddleware');
const { getImagesByCategory,
    updateImage,
    getImagesBySubcategory,
    uploadImage,
    updateImageLayout,
    reorderImages,
    deleteImage, 
    getAllImages} = require("../controller/imageController");

const imgFields = imageUpload.fields([
    { name: 'image_desktop', maxCount: 1 },
]);

router.get('/', isAuthenticatedUser, getAllImages);   
router.get('/category/:categoryId', getImagesByCategory);
router.get('/subcategory/:subcategoryId', getImagesBySubcategory);
router.put('/:id', isAuthenticatedUser, imgFields, updateImage); 
router.post('/', isAuthenticatedUser, imgFields, uploadImage);
router.patch('/:id/layout', isAuthenticatedUser, updateImageLayout);
router.put('/reorder', isAuthenticatedUser, reorderImages);
router.delete('/:id', isAuthenticatedUser, deleteImage);

module.exports = router;
