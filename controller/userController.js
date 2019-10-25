const _ = require('lodash');
const {User,validate} = require('../model/user');
const bcrypt = require('bcrypt');
// const validate = require('../model/user')

exports.userRegistration = async (req,res,next)=>{
    try{ 
        console.log(req.body)
        const {error} = validate(req.body)
        console.log(error);
        if(error) return res.status(400).send(error.details[0].message)
        const user = new User(_.pick(req.body,['name','email','password','mobileNo','address','carInfo']))
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const result = await user.save();
        res.send(_.pick(result,['_id','name','email','address']));
    }
    catch (err){    
        console.log("Error starts here ......................",err)
        res.status(400).send( err.errors);
        // next();
    }
}