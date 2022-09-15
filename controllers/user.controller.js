const User = require('../schemas/user.schema');

function getUser(req, res) {
    return res.status(200).send({
        message: 'Traer usuario'
    })
};

function getUsers(req, res) {
    User.find({}, (error, users) => {
        console.log('users', users)
        return res.status(200).send({
            message: 'Usuarios obtenidos correctamente',
            users
        })
    })
};

function createUser(req, res) {
    return res.status(200).send({
        message: 'usuario creado'
    })
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