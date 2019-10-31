const { Status } = require('../model/status')
const { mailTransporter } = require('../middleware/mailer');
exports.createStatus = async (req, res, next) => {
    const status = new Status({
        name: req.body.name,
        description: req.body.description,
        priorityStatus: req.body.priorityStatus
    })
    const result = await status.save();
    mailTransporter.sendMail(mailbody(),(err,info)=>{
        if( err) console.log(err);
        console.log(info)
    });
    res.status(201).send(result);
}

function mailbody() {
    return {
        from: process.env.EMAIL_USERNAME,
        to: 'karthikraj.krishnamoorthy@ebenefitsnetwork.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    }
}