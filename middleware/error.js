const winston = require('winston');
const { mailTransporter } = require('../middleware/mailer')

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    console.log("Error",err);
    // if (process.env.NODE_ENV) mailTransporter.sendMail(initOption(req,err), (err, info) => {
    //     if (err){
    //         winston.info(err.message, err);

    //     }
    //  })
    console.log(process.env.NODE_ENV)
    res.status(500).send("Oops something happened");
}

function initOption(req,err) {
    return {
        from: process.env.EMAIL_USERNAME,
        to: 'colkar99@gmail.com',
        subject: `${process.env.NODE_ENV} Error occurs`,
        html: `<h4>${err.message}</h4>
                <p>${err}</p>
                <ul>
                <li><label>Name:</label>${req.catchUser.name}</li>
                <li><label>Email:</label>${req.catchUser.email}</li>
                <li><label>Mobile No:</label>${req.catchUser.mobileNo}</li>
                <li><label>Car Model:</label>${req.catchUser.carModel}</li>
                <li><label>Car Vareity:</label>${req.catchUser.carVariety}</li>
                <li><label>Wash type:</label>${req.catchUser.washType}</li>
                <li><label>House Type:</label>${req.catchUser.houseType}</li>
                <li><label>Price:</label>${req.catchUser.currentPrice}</li>
            </ul>`
    }
}