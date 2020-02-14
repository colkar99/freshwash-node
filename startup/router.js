const userRouter = require('../router/user');
const authRouter = require('../router/auth');
const orderRouter = require('../router/order');
const statusRouter = require('../router/status');
const error = require('../middleware/error');
const express = require('express');
module.exports = function (app) {
    app.use(express.json());
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/order', orderRouter);
    app.use('/status', statusRouter);
    //Common Error handling function
    app.use(error);
}