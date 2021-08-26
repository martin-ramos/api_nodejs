const express = require('express');
const bodyParser = require('body-parser');
const properties = require('./config/properties');
require("dotenv").config();


const customersRoutes = require('./customers/customers.routes');
const usersRoutes = require('./users/user.routes');


const db = require('./config/database');
// Init db
db();

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true});
const app = express();
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

// init routes
const router = express.Router();
app.use('/api', router);
customersRoutes(router);
usersRoutes(router);


app.listen(properties.PORT, () => console.log(`Server is running on ${properties.PORT}`));