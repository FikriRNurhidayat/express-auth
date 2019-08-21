const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authorize = require('../helpers/authenticate.js');

router.get('/', authorize, userController.whoAmI);
router.get('/confirm/:id', userController.confirmUser);
router.get('/aku', userController.currentUser);

module.exports = router;
