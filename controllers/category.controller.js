const Category = require('../schemas/category.schema')

async function getCategory(req, res) {
    try {
        const categories = await Category.find().populate('user', '_id');
        return res.status(200).send({
            ok: true,
            message: `Categorías obtenidas correctamente`,
            categories
        })
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: `No se pudieron obtener las categorías`
        })
    }
}

async function createCategory(req, res){
    try {
        let category = new Category(req.body);
        const newCatedory = await category.save();

        return res.status(200).send({
            ok: true,
            message: 'Categoría creada',
            newCatedory
        })
        
    } catch (error) {
        return res.send({
            ok:false,
            message: 'Error al crear la categoría',
            error
        })
    }
};

async function updateCategory(req, res){

    try {
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            return res.status(400).json({
              ok: false,
              message: 'Cuerpo de solicitud vacia.'
            });
          }
          const id = req.params.id;
          const categoryDataToUpdate = req.body;
          const updateCategory = await Category.findByIdAndUpdate(id, categoryDataToUpdate, { new: true })

          return res.status(200).send({
            ok: true,
            message: 'Categoría Actualizada',
            updateCategory
          });
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error al intentar actualizar la categoría',
            error
        })
    }
};

async function deleteCategory(req, res){
    try {
        const id = req.params.id;
        const deleteCategory = await Category.findByIdAndDelete(id);
        return res.status(200).send({
            message: 'Categoría eliminada',
            deleteCategory
        })
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: 'Error al intentar borrar la categoría',
            error
        })
    }
}

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
