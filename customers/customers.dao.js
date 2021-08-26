const mongoose = require('mongoose');
const customerSchema = require('./customers.model');

customerSchema.statics = {
    create: function(data, cb) {
        const customer = new this(data);
        customer.save(cb);
    },

    get: function(query, cb) {
        this.find(query, cb);
    },
}

module.exports = mongoose.model('Customer', customerSchema);