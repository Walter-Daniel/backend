const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUser(req, res) {

    const id = req.params.userID;
    const user = await User.findById(id);
    if(!user) return res.status(404).send({
        ok: false,
        message: `No se encontró ningún usuario con el id: ${id}`
    });
    return res.status(200).send({
        message: 'Usuario encontrado',
        user
    });
};

async function getUsers(req, res) {

    let searchParams = {};
    
    const name = req.params.name;
    
    if( name ) {
        searchParams = { fullName: new RegExp( name, 'i' )}
    }

    try {
        const [ users, total ] = await Promise.all([
            User.find(searchParams).select({ password: 0, __v: 0 })
                                    .collation({ locale: 'es' })
                                    .sort({ createdAt: -1 }),
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
        const {fullName, email} = newUser;

        return res.status(200).send({
            ok: true,
            message: 'Usuario registrado',
            newUser: {
                fullName,
                email
            }
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

    const id = req.params.id;

    if(req.body.password) {
        req.body.password = await bcrypt.hash( req.body.password, saltRounds) 
    }

    const newUser = await User.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).send({
        ok: true,
        message: 'Usuario editado',
        newUser
    })
};

async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const deletedUser = await User.findByIdAndUpdate({_id: id}, {active: false});
        
        return res.status(200).send({
        ok: true,
        message: 'Usuario eliminado',
        deletedUser
    })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'No se pudo eliminar el usuario.',
            error
        })
    }
};

module.exports = {
    createUser,
    editUser,
    deleteUser,
    getUser,
    getUsers
}