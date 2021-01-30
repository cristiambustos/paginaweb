const routerx = require('express-promise-router');
const userController = require('../controllers/usersControllers.js');

const router = routerx();

router.post('/login',userController.login);
router.get('/list', userController.list);
router.post('/add', userController.add);
router.put('/update', userController.update);
router.put('/activate', userController.activate);
router.put('deactivate', userController.deactivate);

module.exports = router;