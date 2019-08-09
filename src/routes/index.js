const router = require('express').Router();
const userRouter = require('./userRouter.js');
const authRouter = require('./authRouter.js');

router.use('/users', userRouter);
router.use('/auth', authRouter);

module.exports = router;
