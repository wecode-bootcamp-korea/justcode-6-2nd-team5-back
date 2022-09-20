const express = require('express');
const loginController = require('../controllers/loginLogoutController');

const router = express.Router();

router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;
