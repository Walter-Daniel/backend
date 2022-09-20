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

async function getUsers(req, res) {

    let searchParams = {};
    
    const name = req.params.name;
    const page = req.query.page || 0;
    const itemPerPage = req.query.item || 10;
    
    if( name ) {
        searchParams = { fullName: new RegExp( name, 'i' )}
    }

    try {
        const [ users, total ] = await Promise.all([
            User.find(searchParams).select({ password: 0, __v: 0 })
                                    .skip( page * itemPerPage )
                                    .limit(itemPerPage),
            User.find(searchParams).countDocuments()
        ]);

        if(users.length === 0){
            return res.status(404).send({
                ok: true,
                message: 'No se encontró ningun usuario'
            })
        }

        return res.status(200).send({
            ok: true,
            message: 'Usuarios obtenidos correctamente',
            users,
            total
        })

    } catch (error) {
        if(error) {
            return res.status(500).send({
                ok: false,
                message: 'Error al obtener usuario',
                error
            })
        }
    }

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

async function login(req, res) {

    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    const user = await User.findOne({ email: reqEmail });

    if( !user ){
        return res.status(404).send({
            message: 'No se encontro ningun usuario con ese correo'
        })
    }

    const checkPassword = await bcrypt.compare( reqPassword, user.password );

    if( !checkPassword ){
        return res.status(400).send({
            message: 'Credenciales incorrecta'
        })
    }

    user.password = undefined;

    return res.status(200).send({
        message: 'Usuario logueado',
        user
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