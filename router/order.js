const express = require('express');
const router = express.Router();
const orderController = require('../controller/ordersController');

router.post('/web-order', orderController.webOrders);
router.get('/all-orders', orderController.getOrders);


module.exports = router;