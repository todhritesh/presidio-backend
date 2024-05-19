const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/userController')
const upload = require('../services/multerService')
const verifyJWTMiddleware = require("../middlewares/verifyJWTMiddleware")


router.post('/register' ,mechanicController.register);
router.get('/all',mechanicController.all);


module.exports = router;
