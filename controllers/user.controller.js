function getUser(req, res) {
    return res.status(200).send({
        message: 'Traer usuario'
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
    createUser,
    editUser,
    deleteUser,
    login
}