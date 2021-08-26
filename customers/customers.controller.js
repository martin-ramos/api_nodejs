const Customers = require('./customers.dao');

module.exports = createCustomer = (req, res, next) => {
    const customer = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
    };

    //console.log('llega');
    res.status(201).json({'message': 'CONTROLLER'}).send()

    // Customers.create(customer, (err, customer) => {
    //     if (err) res.json({ error: err});
    //     res.json({message: 'Customer created successfully'});
    // });
}

module.exports = getCustomers = (req, res, next) => {
    Customers.get({}, (err, customers) => {
        if (err) res.json({ error: err});
        res.json({Customers: customers});
    });
}