const jwt = require('jsonwebtoken');

const secretSeed  = process.env.secretSeed;

const jwtVerify = ( req, res, next ) => {

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        })
    }

    try {
        const { _id, fullName, email, role } = jwt.verify(token, secretSeed)
        req.user = {_id, fullName, email, role}
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido' 
        })
    }

    next();

};

module.exports = jwtVerify;
