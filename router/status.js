const express = require('express');
const router = express.Router();
const statusController = require('../controller/statusController');
// const asyncMiddleware = require('../middleware/asyncMiddleware'); 


router.post('/create-status', statusController.createStatus);

module.exports = router;