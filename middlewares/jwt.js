const jwt = require('jsonwebtoken');
const { secretSeed } = require('../config/config');

const jwtVerify = ( req, res, next ) => {

    const token = req.headers.authorization;

    jwt.verify(token, secretSeed, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                message: 'Token inválido'
            })
        }
        req.user = decoded
        next();
    })

};

module.exports = jwtVerify;
