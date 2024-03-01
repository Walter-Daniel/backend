const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const secretSeed = process.env.secretSeed;
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/generateJWT');

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

        const userLogin = {
            "_id": user._id,
            "fullName": user.fullName,
            "email": user.email,
            "role": user.role
        };
        const token = await generateJWT(userLogin);
        
        return res.status(200).send({
            message: 'Inicio de sesión exitoso.',
            user: userLogin,
            token
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: 'Error al intentar loguear usuario',
            errorMessage: error
        })
    } 
};

const tokenRevalidated = async(req, res) => {

    const { _id, fullName, email, role } = req.user;
    const user = {
        _id, 
        fullName,
        email,
        role
    }
    const token = await generateJWT(user);

    res.json({
        ok: true,
        message: 'Se revalidó el token',
        user,
        token
    })
};

module.exports = {
    login,
    tokenRevalidated
}