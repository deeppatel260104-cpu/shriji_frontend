const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
    getAllPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage,
} = require("../controller/packageController");

router.get('/', getAllPackages);
router.get('/:id', getPackageById);
router.post('/', isAuthenticatedUser, createPackage);
router.put('/:id', isAuthenticatedUser, updatePackage);
router.delete('/:id', isAuthenticatedUser, deletePackage);

module.exports = router;
