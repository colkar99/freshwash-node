const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
// const validate = require('../model/user')

exports.login = async (req,res,next)=>{
    try{ 
        console.log(req.body)
        const {error} = validate(req.body)
        console.log(error);
        if(error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).send("Invalid email or password")
        const result = await bcrypt.compare(req.body.password,user.password);
        if(!result) return res.status(404).send("Invalid email or password");
        const token = user.generateJwtToken();
        res.send(token)
    }
    catch (err){    
        console.log("Error starts here ......................",err)
        res.status(400).send( err.errors);
        // next();
    }
}

function validate(data){
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
    return Joi.validate(data,schema);
}