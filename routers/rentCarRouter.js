const express = require("express");
const rentCarController = require("../controllers/rentCarController");

const router = express.Router();

router.post("", rentCarController.registeRentCar);
router.get("/searchList", rentCarController.getRentCarList);
router.get("", rentCarController.getRentCar);

module.exports = router;
