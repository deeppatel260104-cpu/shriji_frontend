const router = require('express').Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
    getAllAddOnPackages,
    getAddOnPackageById,
    createAddOnPackage,
    updateAddOnPackage,
    deleteAddOnPackage,
} = require("../controller/addOnPackageController");

router.get('/', getAllAddOnPackages);
router.get('/:id', getAddOnPackageById);
router.post('/', isAuthenticatedUser, createAddOnPackage);
router.put('/:id', isAuthenticatedUser, updateAddOnPackage);
router.delete('/:id', isAuthenticatedUser, deleteAddOnPackage);

module.exports = router;
