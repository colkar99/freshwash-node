const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    statusId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const OrderItem = mongoose.model('OrderItem',orderItemSchema);
exports.OrderItem = OrderItem;