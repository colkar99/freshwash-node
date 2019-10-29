const mongoose = require('mongoose');
const Joi = require('joi');

const invoiceShema = new mongoose.Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
},{timestamps: true})