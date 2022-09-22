const express = require('express');
const lodgmentController = require('../controllers/lodgmentController');

const router = express.Router();
router.get('/:id',lodgmentController.lodgment)
router.post('/review',lodgmentController.lodgmentReviewWrite)

module.exports = router;