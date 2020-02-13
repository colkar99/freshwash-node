const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const isAdmin = require('../middleware/admin');
// const asyncMiddleware = require('../middleware/asyncMiddleware'); 


router.post('/registration',userController.userRegistration);
//router.get('/get-all-users',isAdmin,userController.getAllUsers)

module.exports = router;