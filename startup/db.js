const mongoose = require('mongoose');
const winston = require('winston')

const enviroment = process.env.NODE_ENV || 'development'
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@freshwash-ycjff.mongodb.net/${enviroment}?retryWrites=true&w=majority`;
// const MONGODB_URI = "mongodb://localhost/playground"

module.exports = function () {
    //connected mongodb 
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
        .then(data => {
            winston.info("Database connected successfully");
            // app.listen(8080,'localhost');
        })
        console.log(MONGODB_URI);
}


