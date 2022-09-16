const User = require('../schemas/user.schema');

function getUser(req, res) {
    return res.status(200).send({
        message: 'Traer usuario'
    })
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
        const newUser = await user.save();
        newUser.password = undefined;
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

function editUser(req, res) {
    return res.status(200).send({
        message: 'usuario editado'
    })
};

function deleteUser(req, res) {
    return res.status(200).send({
        message: 'usuario borrado'
    })
}

function login(req, res) {
    return res.status(200).send({
        message: 'usuario logueado'
    })
}

module.exports = {
    getUser,
    getUsers,
    createUser,
    editUser,
    deleteUser,
    login,
}