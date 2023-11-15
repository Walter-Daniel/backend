const Category = require('../schemas/category.schema');

const existCategory = async(id) => {
    console.log(id)
    const iscategory = await Category.findById(id);
    if(!iscategory){
        throw new Error('No existe la categoría en la base de datos')
    }
}

module.exports = {
    existCategory,
};