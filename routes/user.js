const routerx = require('express-promise-router');
const userController = require('../controllers/usersControllers');

const router = routerx();

router.post('/',userController.login);
router.get('/users', userController.list);
router.post('/addUser', userController.add);
router.put('/updateUser', userController.update);
router.put('/activateUser', userController.activate);
router.put('deactivateUser', userController.deactivate);

module.exports = router;