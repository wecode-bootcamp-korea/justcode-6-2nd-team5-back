const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter.js");
const loginLogoutRouter = require("./loginLogoutRouter.js");
const tokenRouter = require("./tokenRouter");
const lodgmentRouter = require("./lodgmentRouter");
const rentCarRouter = require("./rentCarRouter");

router.use("/users", userRouter);
router.use("/users", loginLogoutRouter);
router.use("/token", tokenRouter);
router.use("/lodgment", lodgmentRouter);
router.use("/rentcar", rentCarRouter);

module.exports = router;
