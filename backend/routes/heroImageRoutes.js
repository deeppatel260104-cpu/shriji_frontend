const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const { heroUpload } = require('../middleware/uploadMiddleware');
const { getHeroImage,
    uploadHeroImage,
    updateHero,
    toggleHeroStatus,
    deleteHeroImage } = require("../controller/heroController");

const router = express.Router();
const heroFields = heroUpload.fields([
    { name: 'mobile_image', maxCount: 1 },
    { name: 'desktop_image', maxCount: 1 },
]);

router.get('/', getHeroImage);
router.post('/', isAuthenticatedUser, heroFields, uploadHeroImage,);
router.put('/:id', isAuthenticatedUser, heroFields, updateHero);
router.patch('/:id/status', isAuthenticatedUser, toggleHeroStatus);
router.delete('/:id', isAuthenticatedUser, deleteHeroImage);

module.exports = router;