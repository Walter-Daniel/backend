const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const secretSeed = process.env.secretSeed;
const bcrypt = require('bcrypt');

async function login(req, res) {

    try {
        const reqEmail = req.body.email;
        const reqPassword = req.body.password;
    
        const user = await User.findOne({ email: reqEmail });
    
        if( !user ){
            return res.status(404).send({
                message: 'Credenciales incorrectas.'
            })
        };

        const checkPassword = await bcrypt.compare( reqPassword, user.password );
    
        if( !checkPassword ){
            return res.status(400).send({
                message: 'Credenciales incorrectas.'
            })
        };
    
        if(!user.active) {
            return res.status(400).send({
                message: 'Error al ingresar. Comuniquese con un administrador.'
            })
        }

        const token = await jwt.sign( user.toJSON(), secretSeed, { expiresIn: '8h' } );

        const userLogin = {
            "_id": user._id,
            "fullName": user.fullName,
            "email": user.email,
            "role": user.role
        };
        
        return res.status(200).send({
            message: 'Inicio de sesión exitoso.',
            user: userLogin,
            token
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error al intentar loguear usuario',
        })
    } 
};

module.exports = {
    login
}