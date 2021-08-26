const mongoose = require('mongoose');
const Schema = mongoose.Schema ;
const ObjectId = Schema.ObjectId;

const customerSchema = new Schema({
    name : {
        type: String,
        required: false
    },
    email : {
        type: String,
        required: true,
        unique: false
    },
    phone : {
        type: String,
        required: false
    },
    address : {
        type: String,
        required: false
    },
    city : {
        type: String,
        required: false
    }
},
{
    timestamp: true

});

module.exports = mongoose.model('Customer', customerSchema)