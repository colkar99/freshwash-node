const mongoose = require('mongoose')

const orderStatusSchema = new mongoose.Schema({
    //new user Schema
    status:{
        type: Number,
        required: true
    },
    statusDescription:{
        type: String,
        required: true
    }
},{timestamps: true})

const OrderStatus = mongoose.model('orderStatus', orderStatusSchema);
exports.OrderStatus = OrderStatus;