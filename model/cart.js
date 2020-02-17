const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })
let CartSchema = mongoose.model('CartSchema',cartSchema);

exports.CartSchema = CartSchema;