const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter.js');
const loginLogoutRouter = require('./loginLogoutRouter.js');
const tokenRouter = require('./tokenRouter');
const lodgmentRouter = require('./lodgmentRouter')
const restaurantRouter = require('./restaurantRouter')


router.use("/users", userRouter);
router.use("/users", loginLogoutRouter);
router.use("/token", tokenRouter);
router.use("/lodgment", lodgmentRouter);
router.use("/rentcar", rentCarRouter);
router.use("/reservation", rentCarRouter);

router.use(lodgmentRouter)


module.exports = router;
