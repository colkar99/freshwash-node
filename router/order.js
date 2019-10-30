const express = require('express');
const router = express.Router();
const orderController = require('../controller/ordersController');
// const asyncMiddleware = require('../middleware/asyncMiddleware'); 


router.post('/web-order', orderController.webOrders);
router.get('/all-orders', orderController.getOrders);


module.exports = router;