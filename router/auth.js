const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
// const auth = require('../middleware/auth'); 

router.post('/',authController.login);

module.exports = router;