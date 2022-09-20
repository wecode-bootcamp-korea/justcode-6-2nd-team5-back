const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/ping', userController.pong);
router.post('/signup', userController.createUser);
//router.post('/name', userController.sendUserName);

module.exports = router;
