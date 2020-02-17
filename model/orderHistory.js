const mongoose = require('mongoose');

const orderHistorySchema = new mongoose.Schema({
    approvedDate: {
        type: Date,
        required: true
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    }
}, { timestamps: true })