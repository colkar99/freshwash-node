const express = require('express');
const app = express();
const userRouter = require('./router/user');
const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://localhost/playground"

mongoose.connect(MONGODB_URI,)
// app.use(express.json());
app.use(express.json());

app.use('/api/user',userRouter);

//connected mongodb 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(data => {
        app.listen(3000);
    }).catch(err => console.log(err))

