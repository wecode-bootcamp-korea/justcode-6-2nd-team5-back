const express = require("express");
const rentCarController = require("../controllers/rentCarController");

const router = express.Router();

router.post("", rentCarController.registeRentCar);
router.get("/searchList", rentCarController.getRentCarList);
router.get("", rentCarController.getRentCar);
router.post("/review", rentCarController.rentcarReview);
router.delete("/review", rentCarController.rentcarReviewDelete);
router.get("/detail", rentCarController.getRentCarDetail);
router.get("/filteredList", rentCarController.rentcarfiltereddata);
router.post("/reservation", rentCarController.rentCarReserve);
router.get("/review", rentCarController.getMyRentCarReview);
router.get("/myreservation", rentCarController.getMyRentCarReserve);
router.get("/rentcar/:reservationid", rentCarController.getMyRentCarReserve);
// router.post("/insertreview", rentCarController.insertreview);

module.exports = router;
