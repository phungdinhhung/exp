const authController = require('../controllers/auth.controller');
const router = require('express').Router();

router.get('/',authController.logOut);

module.exports = router;