const mongoose = require('mongoose');
const Joi = require('joi');

const statusSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true 
    },
    description: {
        type: String,
        required: true
    },
    priorityStatus:{
        type: Number,
        required: true
    }

},{timestamps: true})

function validate(status){
    const schema = {
        name: Joi.string().required(),
        description: Joi.string().required(),
        priorityStatus: Joi.number().required()
    }
}

const Status = mongoose.model('Status',statusSchema);

exports.Status = Status;
exports.validate = validate;

// user: {
//     type: Schema.Types.ObjectId,
//      ref: 'User',
//      required: true
// },
// status: {
    
// }
// carModel:{type: String,default:""},
// carVariety:{type: String,default:""},