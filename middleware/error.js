const winston = require('winston');
const { mailTransporter } = require('../middleware/mailer')

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    if (process.env.NODE_ENV === "production") mailTransporter.sendMail(initOption(err), (err, info) => { })

    res.status(500).send("Oops something happened");
}

function initOption(err) {
    return {
        from: process.env.EMAIL_USERNAME,
        to: 'colkar99@gmail.com',
        subject: 'Error occured in production',
        html: `<h4>${err.message}</h4>
                <p>${err}</p>`
    }
}