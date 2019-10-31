const winston = require('winston');
require('winston-mongodb');
const enviroment = process.env.NODE_ENV || 'development'
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@freshwash-ycjff.mongodb.net/${enviroment}?retryWrites=true&w=majority`;
require('express-async-errors');


module.exports = function(){
    process.on('unhandledRejection',(ex)=>{
        throw ex;
    })
    // process.on('uncaughtException',(ex)=>{
    //     winston.error(ex.message,ex)
    // })
    winston.exceptions.handle(new winston.transports.File({ filename: 'log/exceptions.log' }));
    winston.add(new winston.transports.File({ filename: 'log/logfile.log',level:'debug' }));
    winston.add(new winston.transports.MongoDB({ db: MONGODB_URI,level:'debug'}));
    console.log(MONGODB_URI);
}