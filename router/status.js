const express = require('express');
const router = express.Router();
const statusController = require('../controller/statusController');

router.post('/create-status', statusController.createStatus);

module.exports = router;