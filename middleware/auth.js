const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).send("Es necesario el token para ser autenticado");
    }

    try {
        jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
            req.user = user;
        });
        
        if (!req.user) {
            return res.status(401).send("Datos incorrectos");    
        } 
        return next();
    } catch (err) {
        return res.status(401).send("Token invalido");
    }
};

module.exports = verifyToken;