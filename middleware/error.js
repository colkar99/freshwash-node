const winston = require('winston');
const { mailTransporter } = require('../middleware/mailer')

module.exports = function (err, req, res, next) {
    winston.error(err.message, err);
    if (process.env.NODE_ENV) mailTransporter.sendMail(initOption(err), (err, info) => {
        if (err){
            winston.info(err.message, err);

        }
     })
    console.log(process.env.NODE_ENV)
    res.status(500).send("Oops something happened");
}

function initOption(err) {
    return {
        from: process.env.EMAIL_USERNAME,
        to: 'colkar99@gmail.com',
        subject: `${process.env.NODE_ENV} Error occurs`,
        html: `<h4>${err.message}</h4>
                <p>${err}</p>`
    }
}