const {Status} = require('../model/status')
exports.createStatus = async (req,res,next)=>{
    const status = new Status({
        name: req.body.name,
        description: req.body.description,
        priorityStatus: req.body.priorityStatus
    })
    const result = await status.save();
    res.status(201).send(result);
}