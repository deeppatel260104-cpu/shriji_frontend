const express = require('express');
const { login, logout, getMe, resetPassword, forgotPassword} = require("../controller/userController")
const { isAuthenticatedUser } = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/logout', isAuthenticatedUser, logout);
router.get('/me', isAuthenticatedUser, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
