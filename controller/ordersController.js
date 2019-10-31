const { User } = require('../model/user');
const bcrypt = require('bcrypt');
const { Order } = require('../model/order');
const { Status } = require('../model/status');
const { mailTransporter } = require('../middleware/mailer');

exports.webOrders = async (req, res, next) => {
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
    const result = await order.save()
    result.orders.reverse();
    mailTransporterSend(result)
    res.status(201).send(result);

}
exports.getOrders = async (req, res, next) => {

    const orders = await Order.find()
        .sort({'orders.createdAt': 1})
        .populate('user', 'name email mobileNo -_id')
        .populate('orders.status', 'name description priorityStatus')
        .populate('order.assignedStaffDetail')
      orders[0].orders.reverse();
    res.status(200).send(orders);

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
    if (!status) return new Error(`Status not found with this priortity status ${statusCode} ..Admin Please create status before placing the order`)
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

async function mailTransporterSend(order) {
    const orders = await Order.findOne({user: order.user})
    .populate('user', 'name email mobileNo -_id')
    orders.orders.reverse();
    mailerOption = {
        from: process.env.EMAIL_USERNAME,
        to: 'colkar99@gmail.com',
        subject: 'New order',
        html: `<h2>New order request came</h2>
                <ul>
                    <li><label>Name:</label>${orders.user.name}</li>
                    <li><label>Email:</label>${orders.user.email}</li>
                    <li><label>Mobile No:</label>${orders.user.mobileNo}</li>
                    <li><label>Car Model:</label>${orders.orders[0].carModel}</li>
                    <li><label>Car Vareity:</label>${orders.orders[0].carVariety}</li>
                    <li><label>Wash type:</label>${orders.orders[0].washType}</li>
                    <li><label>House Type:</label>${orders.orders[0].houseType}</li>

                </ul>`
    }
    mailTransporter.sendMail(mailerOption,(err,info)=>{
        if( err) throw new Error(err);
        console.log(info)
    });
    return true;
}