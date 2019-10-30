const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const asyncMiddleware = require('../middleware/asyncMiddleware'); 


router.post('/',userController.userRegistration);

module.exports = router;