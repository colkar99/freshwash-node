const mongoose = require('mongoose')

const deliveryAddressSchema = new mongoose.Schema({
    //new user Schema
    addressLine1:{
        type: String,
        required: true
    },
    addressLine2:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true
    },
    landMark:{
        type: String
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const DeliveryAddress = mongoose.model('deliveryAddress', deliveryAddressSchema);
exports.DeliveryAddress = DeliveryAddress;