const mongoose = require('mongoose');
const winston = require('winston')

const MONGODB_URI = `mongodb+srv://karthik:BWbzwL0UlSRek2sC@freshwash-ycjff.mongodb.net/test?retryWrites=true&w=majority`;
// const MONGODB_URI = "mongodb://localhost/playground"

module.exports = function () {
    //connected mongodb 
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
        .then(data => {
            winston.info("Database connected successfully");
            // app.listen(8080,'localhost');
        })
}


