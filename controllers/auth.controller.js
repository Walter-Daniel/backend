const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const secretSeed = process.env.secretSeed;
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function register(req, res) {
    try {
        let user = new User(req.body);
        let password = req.body.password;

        const encryptedPassword = await bcrypt.hash( password, saltRounds) 
            if( !encryptedPassword ) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al guardar usuario'
                })
            
            };
            
        user.password = encryptedPassword;
        const newUser = await user.save();

        return res.status(200).send({
            message: 'Usuario creado',
            newUser
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: 'Error al crear un nuevo usuario',
            error
        })
    }   
};

async function login(req, res) {

    try {
        const reqEmail = req.body.email;
        const reqPassword = req.body.password;
    
        const user = await User.findOne({ email: reqEmail });
    
        if( !user ){
            return res.status(404).send({
                message: 'No se encontró ningún usuario con ese correo'
            })
        };

        const checkPassword = await bcrypt.compare( reqPassword, user.password );
    
        if( !checkPassword ){
            return res.status(400).send({
                message: 'Credenciales incorrecta'
            })
        };
    
        user.password = undefined;

        if(!user.active) {
            return res.status(400).send({
                message: 'El usuario se encuentra inactivo'
            })
        }

        const token = await jwt.sign( user.toJSON(), secretSeed, { expiresIn: '8h' } );
        
        return res.status(200).send({
            message: 'Usuario logueado',
            user,
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
    register,
    login
}