const express = require('express');

const registerController = require('../controllers/register.controller');

const router = express.Router();

router.get('/', registerController.renderRegisterPage);
router.post('/', registerController.renderUserRegister);

module.exports = router;