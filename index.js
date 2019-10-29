const express = require('express');
const app = express();
const userRouter = require('./router/user');
const authRouter = require('./router/auth');
const orderRouter = require('./router/order');
const statusRouter = require('./router/status');
const mongoose = require('mongoose');
// const MONGODB_URI = "mongodb://localhost/playground"
const config = require('config');
const MONGODB_URI = `mongodb+srv://karthik:${config.get('mongodbPassword')}@freshwash-ycjff.mongodb.net/test?retryWrites=true&w=majority`;

// mongoose.connect(MONGODB_URI,)
// app.use(express.json());
app.use(express.json());

if(!config.has('jwtPrivateKey')){
    console.log(config.has('jwtPrivateKey'))
    console.error('FATTAL ERROR: jwtPrivateKey is not defined in env');
    process.exit(1);
}
console.log(MONGODB_URI);

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/order', orderRouter);
app.use('/api/status', statusRouter);


//connected mongodb 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(data => {
        app.listen(8080,'localhost');
    }).catch(err => console.log(err))

