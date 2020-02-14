const mongoose = require('mongoose')
const Joi = require('joi');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    //new user Schema
    firstName: {type: String},
    lastName:{type: String},
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    phoneNumber:{
        type: Number,
        minlength: 10,
        maxlength: 15,
        required: true
    },
    password:{
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    shippingAddress: {
        address: String,
        suite_apt: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },
    billingAddress: {
        address: String,
        suite_apt: String,
        city: String,
        state: String,
        country: String,
        pincode: String
    },
    company: {type: String},
    taxId: {type: String},
    comments: {type: String},
    isAdmin: {
        type: Boolean,
        default:false
    }
    //Old user schema
    // name: {
    //     type: String,
    //     minlength: 3,
    //     maxlength: 250
    // },
    // email: {
    //     type: String,
    //     unique: true,
    //     index: true,
    //     required: true
    // },
    // mobileNo: {
    //     type: Number,
    //     required: true,
    //     minlength: 10,
    //     maxlength: 13
    // },
    // password: {
    //     type: String,
    //     minlength: 6,
    //     maxlength: 255,
    //     required: true

    // },
    // address: {
    //     line_1: String,
    //     line_2: String,
    //     landMark: String,
    //     city: String,
    //     state: String,
    //     country: String,
    //     pincode: String
    // },
    // carInfo: [
    //     {
    //     carModel: String,
    //     carVariety: String,
    //     carNo: String
    //     }
    // ],
    // isAdmin: {
    //     type: Boolean,
    //     default:false
    // }
},{timestamps: true})

userSchema.plugin(uniqueValidator, { message: 'Email has been already taken' });
userSchema.methods.generateJwtToken = function (){
    const token = jwt.sign({_id: this._id,isAdmin: this.isAdmin},process.env.JWTPRIVATEKEY);
    return token;
};

const User = mongoose.model('User', userSchema);
function userValidate(user){
    let schema = {
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.number().min(10).required(),
        password: Joi.string().min(6).max(255).required(),
        shippingAddress: Joi.object(),
        billingAddress: Joi.object(),
        // carInfo: Joi.array(),
        company: Joi.string(),
        taxId: Joi.string().min(0),
        comments: Joi.string().allow(''),
    }
    return Joi.validate(user,schema);
}
exports.User = User;
exports.validate = userValidate;
