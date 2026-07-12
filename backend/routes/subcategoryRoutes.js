const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const { getSubcategoriesByCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory } = require("../controller/subcategoryController");

router.get('/:categoryId', getSubcategoriesByCategory);
router.post('/', isAuthenticatedUser, createSubcategory);
router.put('/:id', isAuthenticatedUser, updateSubcategory);
router.delete('/:id', isAuthenticatedUser, deleteSubcategory);

module.exports = router;