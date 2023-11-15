const Category = require('../schemas/category.schema');

const existCategory = async(id) => {
    const iscategory = await Category.findById(id);
    if(!iscategory){
        throw new Error('No existe la categoría en la base de datos')
    }
}

const hasARole = (req, res, next) => {

    try {
        const role = req.user.role;
        if( !role || role !== 'ADMIN_ROLE' && role !== 'USER_ROLE'  ) {
            return res.status(401).send({
                ok: false,
                message: 'No tienes permiso para realizar la acción'
            })
        };
        next();
    } catch (error) {
        res.status(401).send({
            ok: false,
            message: 'No se encontro ningún rol asociado a la cuenta.'
        })
    }

}


module.exports = {
    existCategory,
    hasARole
};