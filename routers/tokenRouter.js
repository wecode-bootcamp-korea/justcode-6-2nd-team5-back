const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

router.get('/auth', tokenController.tokenAuth);

module.exports = router;
