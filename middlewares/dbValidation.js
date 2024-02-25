const Category = require('../schemas/category.schema');
const User = require('../schemas/user.schema');
const Product = require('../schemas/product.schema');

const existCategory = async(id) => {
    const iscategory = await Category.findById(id);
    if(!iscategory){
        throw new Error('No existe la categoría en la base de datos.')
    }
};

const existUser = async(id) => {
    const isUser = await User.findById(id);
    if(!isUser){
        throw new Error('No existe el usuario en la base de datos.')
    }
};

const existProduct = async(id) => {
    const isProduct = await Product.findById(id);
    if(!isProduct){
        throw new Error('No existe el producto en la base de datos.')
    }
};

const hasARole = (req, res, next) => {

    try {
        const role = req.user.role;
        if( !role || role !== 'ADMIN_ROLE' && role !== 'USER_ROLE'  ) {
            return res.status(401).send({
                ok: false,
                message: 'No tienes permiso para realizar la acción.'
            })
        };
        next();
    } catch (error) {
        res.status(401).send({
            ok: false,
            message: 'No se encontro ningún rol asociado a la cuenta.'
        })
    }

};

const existEmail = async(email) => {
    const userEmail = await User.findOne({email: email})
    if(userEmail) {
        throw new Error('El email ya se encuentra registrado en la base de datos.')
    }
};

const imageValidation = (value) => {

    if (!value) {
      throw new Error('Debe seleccionar una imagen.');
    }
  
    const allowedExtensions = ['.jpg', '.jpeg', '.avif', '.png'];
    const extension = value.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(`.${extension}`)) {
      throw new Error('La imagen debe tener una extensión .jpg, .jpeg, .avif o .png.');
    }
  
    return true;
};


module.exports = {
    existCategory,
    existEmail,
    existProduct,
    existUser,
    hasARole,
    imageValidation
};