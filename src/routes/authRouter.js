const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')
const multer = require("multer")

// Sample route for login
router.post('/login',AuthController.login);
router.post('/check',AuthController.checkAuth);
router.post('/get-profile',AuthController.getProfile);
router.post('/refresh-token',AuthController.refreshToken);


module.exports = router;
