const { User } = require('../model/user');
const bcrypt = require('bcrypt');
const { Order } = require('../model/order');
const { Status } = require('../model/status');

exports.webOrders = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) user = await createUser(req.body);
        let order = await Order.findOne({ user: user._id })
        if (!order) {
            order = new Order({
                user: user._id,
            })
        }
        let initOrder = await createOrderObject(req.body);
        order.orders.push(initOrder);
        const result = await order.save();
        res.status(201).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Oops somethig happened");
    }

}
exports.getOrders = async (req, res, next) => {

    try {

        const orders = await Order.find()
            .populate('user', 'name email mobileNo -_id')
            .populate('orders.status', 'name description priorityStatus')
            .populate('order.assignedStaffDetail')
        res.status(200).send(orders);
    }
    catch (err) {
        console.log(err);
        res.send(500).send("Oops somethig happened");

    }
}


// private methods are below
async function createUser(params) {
    let user = new User({
        name: params.name,
        email: params.email,
        mobileNo: params.mobileNo,
        password: params.email
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const result = await user.save();
    return result;
}
async function findStatus(statusCode) {
    const status = await Status.findOne({ priorityStatus: statusCode });
    return status._id;
}

async function createOrderObject(params) {
    const orders = {
        status: await findStatus(0),
        carModel: params.carModel,
        carVariety: params.carVariety,
        isStaffAssigned: false,
        preferDateTime: params.preferDateTime,
        washType: params.washType,
        isDoorStep: true,
        houseType: params.houseType,
        isPaid: false,
        currentPrice: 400,
        offerPrice: 350,
        orderFrom: params.orderFrom
    }
    return orders
}