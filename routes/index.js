const routerx = require('express-promise-router');
const userRouter = require('./user.js');

const router = routerx();

router.use('/user', userRouter);
module.exports = router;