const express = require('express');
const router = express.Router();
const PropertyController = require('../controllers/propertyController')
const jwtMiddleware = require('../middlewares/verifyJWTMiddleware')


router.post('/add',jwtMiddleware,PropertyController.addProperty);
router.get('/get-all',PropertyController.getProperties);
router.get('/my-post',jwtMiddleware,PropertyController.getMyProperties);
router.put('/edit/:id',jwtMiddleware,PropertyController.editProperty);


module.exports = router;
