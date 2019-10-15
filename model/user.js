const mongoose = require('mongoose')
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 250
    },
    email: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    address: {
        line_1: String,
        line_2: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    }
})

const User = mongoose.model('User', userSchema);
function userValidate(user){
    let schema = {
        name: Joi.string(),
        email: Joi.string().email().required(),
        phone_no: Joi.number().min(10).required(),
        address: Joi.object()
    }
    return Joi.validate(user,schema);
}
exports.User = User;
exports.validate = userValidate;
