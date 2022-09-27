const express = require("express");
const rentCarController = require("../controllers/rentCarController");

const router = express.Router();

router.post("", rentCarController.registeRentCar);
router.get("/searchList", rentCarController.getRentCarList);
router.get("", rentCarController.getRentCar);
router.post("/review/:rentcarid", rentCarController.rentcarReview);
router.delete("/review/:reviewid", rentCarController.rentcarReviewDelete);
router.get("/detail", rentCarController.getRentCarDetail);
router.get("/searchList/filteredList", rentCarController.rentcarfiltereddata);

module.exports = router;
