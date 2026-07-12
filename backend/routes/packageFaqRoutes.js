const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
    getAllPackageFaqs,
    getPackageFaqById,
    createPackageFaq,
    updatePackageFaq,
    deletePackageFaq,
} = require("../controller/packageFaqController");

router.get('/', getAllPackageFaqs);
router.get('/:id', getPackageFaqById);
router.post('/', isAuthenticatedUser, createPackageFaq);
router.put('/:id', isAuthenticatedUser, updatePackageFaq);
router.delete('/:id', isAuthenticatedUser, deletePackageFaq);

module.exports = router;
