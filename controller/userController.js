const express = require('express');
const {User,validate} = require('../model/user');
// const validate = require('../model/user')

exports.userRegistration = async (req,res,next)=>{
    try{ 
        console.log(req.body)
        const {error} = validate(req.body)
        console.log(error);
        if(error) return res.status(400).send(error.details[0].message)
        const user = new User({
            name: req.body.last_name,
            email: req.body.email,
            phone_no: req.body.phone_no,
            address:req.body.address
        })
        const result = await user.save();
        res.send(result);
    }
    catch (err){    
        console.log(err)
    }
}