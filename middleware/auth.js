const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access denied, Token not available")
    try{ 
       const result =  jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = result;
        next();
    }
    catch (err){
        res.status(400).send("Invalid token");
    }
}