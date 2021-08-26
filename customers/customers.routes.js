
const Customer = require('./customers.model')

module.exports = (router) => {
    
    router.get('/customer/test', async (req, res) => {
        res.status(200).json({'message': 'Llega perfecto'}).send()
    })
    
    router.post('/customer/add', async (req, res) => { 
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city
        });

        const cs = await customer.save()
        res.json({message: 'Customer created successfully', customer: cs}).send();
    });

    router.get('/customer/:id', async (req, res) => {
        Customer.findById(req.params.id, (error, customer) => {
            if(!customer) {
                return res.status(404).json({'message': 'El cliente no existe'}).send()
            } else {
                return res.status(200).send(customer)
            }
        }) 
    });

    router.put('/customer/:id', async (req, res) => {
        Customer.findById(req.params.id, (error, customer) => {
            if (!customer) {
                return res.status(404).json({'message':'El cliente no existe'})
            } else {
                customer.email = req.body.email;
                customer.name = req.body.name;
                customer.phone = req.body.phone;
                customer.address = req.body.address;
                customer.city = req.body.city;
                const cus = customer.save();
                return res.status(200).json({'message':'El cliente se actualizo con exito', 'cliente': cus}).send()
            };
         })
    });

    router.delete('/customer/:id', async (req, res) => {
        Customer.findByIdAndRemove(req.params.id, (error, customer) => {
            if (customer) {
                return res.status(200).json({'message':'El cliente se borró con exito'})
            } else {
                return res.json({'message':'No se pudo borrar el cliente', 'error': error}).send()
            };
         })
    });

}