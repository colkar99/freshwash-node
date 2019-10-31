const mongoose = require('mongoose')
const Joi = require('joi');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 250
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true

    },
    address: {
        line_1: String,
        line_2: String,
        landMark: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },
    carInfo: [
        {
        carModel: String,
        carVariety: String,
        carNo: String
        }
    ],
    isAdmin: {
        type: Boolean,
        default:false
    }
},{timestamps: true})

userSchema.plugin(uniqueValidator, { message: 'Email has been already taken' });
userSchema.methods.generateJwtToken = function (){
    const token = jwt.sign({_id: this._id,isAdmin: this.isAdmin},process.env.JWTPRIVATEKEY);
    return token;
};

const User = mongoose.model('User', userSchema);
function userValidate(user){
    let schema = {
        name: Joi.string(),
        email: Joi.string().email().required(),
        mobileNo: Joi.number().min(10).required(),
        password: Joi.string().min(6).max(255).required(),
        address: Joi.object(),
        carInfo: Joi.array()
    }
    return Joi.validate(user,schema);
}
exports.User = User;
exports.validate = userValidate;
