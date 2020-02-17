const mongoose = require('mongoose');

const productSizeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const ProductSize = mongoose.model('ProductSize',productSizeSchema);
exports.ProductSize = ProductSize;