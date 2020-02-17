const mongoose = require('mongoose');

const cartItemSizeSchema = new mongoose.Schema({
    cartId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: Number,
        required: true
    },
    sizeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: ProductSize
    }
    
},{timestamps: true})