const express = require('express');
const lodgmentController = require('../controllers/lodgmentController');

const router = express.Router();
router.get('/item/:id',lodgmentController.lodgment)
router.post('/review',lodgmentController.lodgmentReviewWrite)
router.get('/list',lodgmentController.lodgmentList)
router.post('/like',lodgmentController.lodgmentLike)
router.post('/bookmark',lodgmentController.lodgmentBookMark)
router.delete('/reviewDelete',lodgmentController.lodgmentReviewDelete)
router.get('/review',lodgmentController.lodgmentReview)
router.post('/totalInsert',lodgmentController.lodgmentTotalInsert)
router.post('/room',lodgmentController.lodgmentRoomInsert)

router.get('/hotelthema',lodgmentController.lodgmentList)
module.exports = router;