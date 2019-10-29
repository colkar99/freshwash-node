const mongoose = require('mongoose');
const Joi = require('joi');
const testSchema = new mongoose.Schema({
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    carModel: { type: String, default: "" },
    carVariety: { type: String, default: "" },
    isStaffAssigned: { type: Boolean, default: false },
    assignedStaffDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    preferDateTime: {
        date: String,
        time: String
    },
    washType: String,
    isDoorStep: { type: Boolean, default: false },
    houseType: String,
    isPaid: {
        type: Boolean,
        default: false
    },
    currentPrice: { type: Number, default: 0 },
    offerPrice: { type: Number, default: 0 },
    customerRating: { type: Number },
    customerFeedback: String
})

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orders: [testSchema]
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);

exports.Order = Order;