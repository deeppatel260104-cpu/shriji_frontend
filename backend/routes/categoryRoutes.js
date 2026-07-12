const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { catUpload } = require('../middleware/uploadMiddleware');
const { getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory } = require("../controller/categoryController");
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', isAuthenticatedUser, catUpload.single('thumbnail_image'), createCategory);
router.put('/:id', isAuthenticatedUser, catUpload.single('thumbnail_image'), updateCategory);
router.delete('/:id', isAuthenticatedUser, deleteCategory);

module.exports = router;