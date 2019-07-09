const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authorize = require('../helpers/authenticate.js');

router.post('/', userController.createUser);
router.get('/', authorize, userController.whoAmI);
router.get('/confirm/:id', userController.confirmUser);

module.exports = router;
