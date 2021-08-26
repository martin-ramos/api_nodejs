// importing user context
const User = require("./user.model");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
require("dotenv").config();


module.exports = (router) => {

	router.get('/users/test', auth, async (req, res) => {
		res.status(200).json({ 'message': 'Llega perfecto' }).send()
	})

	router.get('/users/:email', async (req, res) => {

	});

	router.post("/register", async (req, res) => {
		try {
			const { nombre, apellido, email, password } = req.body;
			// Valido los campos requeridos
			if (!(email && password && nombre && apellido)) {
				res.status(400).json({ error: "Faltan datos requeridos" }).send();
			}
			const oldUser = await User.findOne({ email });
			if (oldUser) {
				return res.status(409).json({ error: "Correo existente" }).send();
			}
			encryptedPassword = await bcrypt.hash(password, 10);

			const user = await User.create({
				nombre,
				apellido,
				email: email.toLowerCase(),
				password: encryptedPassword,
			});

			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);
			user.token = token;
			user.save();
			res.status(201).json(user);
		} catch (err) {
			console.log(err);
		}
	});

	router.post("/login", async (req, res) => {
		try {
			const { email, password } = req.body;
			// Validamos consistencia de datos de login
			if (!(email && password)) {
				res.status(400).json({error: "Son necesarios todos los campos"}).send();
			}
			// Busco el usuario en la base de datos
			const user = await User.findOne({ email });

			if (user && (await bcrypt.compare(password, user.password))) {
				// Creamos el token
				const token = jwt.sign(
					{ user_id: user._id, email },
					process.env.TOKEN_KEY
				);

				user.token = token;
				user.save();
				res.status(200).json(user).send();
			}
			res.status(400).json({error: "Datos incorrectos"}).send();
		} catch (err) {
			console.log(err);
		}
	});
}