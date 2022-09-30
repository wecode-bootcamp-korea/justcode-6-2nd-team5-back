const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const router = express.Router();

router.get('/list',restaurantController.restaurantList)
router.get('/item/:id',restaurantController.restaurant)
router.post('/add',restaurantController.restaurantAdd)
router.post('/review',restaurantController.restaurantReviewWrite)
router.post('/like',restaurantController.restaurantLike)
router.post('/bookmark',restaurantController.restaurantBookMark)
router.delete('/reviewDelete',restaurantController.restuarantReviewDelete)
router.get('/review',restaurantController.restaurantReview)

router.post('/totalInsert',restaurantController.restaurantTotalInsert)
router.post('/menu',restaurantController.restaurantMenuInsert)
module.exports = router;