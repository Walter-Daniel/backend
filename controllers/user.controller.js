const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUser(req, res) {

    const id = req.params.userID;
    const user = await User.findById(id);
    if(!user) return res.status(200).send({
        ok: false,
        message: `No se encontró ningun usuario con el id: ${id}`
    });
    return res.status(200).send({
        message: 'Traer usuario',
        user
    });
};

function getUsers(req, res) {
    User.find({}, (error, users) => {
        if(error) {
            return res.status(500).send({
                ok: false,
                message: 'Error al obtener usuario',
                error
            })
        }
        if(users.length === 0){
            return res.status(404).send({
                ok: true,
                message: 'No se encontró ningun usuario'
            })
        }
        return res.status(200).send({
            ok: true,
            message: 'Usuarios obtenidos correctamente',
            users
        })
    })
};

async function createUser(req, res) {
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

async function editUser(req, res) {

    const id = req.query.id;
    const newUser = await User.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).send({
        message: 'Usuario editado',
        newUser
    })
};

async function deleteUser(req, res) {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).send({
        message: 'Usuario borrado',
        deletedUser
    })
};

function login(req, res) {
    return res.status(200).send({
        message: 'Usuario logueado'
    })
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    editUser,
    deleteUser,
    login,
}