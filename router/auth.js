const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// const auth = require('../middleware/auth');
// const asyncMiddleware = require('../middleware/asyncMiddleware'); 

router.post('/',authController.login);

module.exports = router;