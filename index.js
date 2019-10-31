const express = require('express');
const app = express();
require('dotenv').config()
const winston = require('winston')

const cors = require('cors')
app.use(cors());
require('./startup/logging')();
require('./startup/router')(app);
require('./startup/db')();
require('./startup/config')();

// throw new Error("Some thinf happened")

const port = process.env.PORT || 8080;
app.listen(port,() => winston.info(`Listing to port no ${port}`))
// console.log(process.env.karthikraj);


