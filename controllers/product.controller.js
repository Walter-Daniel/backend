const Product = require('../schemas/product.schema');

const getProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(product) return res.status(404).send({
        ok: false,
        message: 'No se encontró ningún producto'
    });
    return res.status(200).send({
        ok: true,
        message: 'Producto encontrado',
        product
    });
};

const getProducts = async(req, res) => {
    try {
        let searchCriteria = req.query || {};
        
        Object.keys(searchCriteria).forEach(key => {
            searchCriteria[key] = new RegExp(req.query[key], 'i');
        })

        const [ products, total ] = await Promise.all([
            Product.find(searchCriteria).sort({ createdAt: -1 }),
            Product.find(searchCriteria).countDocuments()
        ])

        return res.status(200).send({
            message: 'Productos obtenidos correctamente',
            products,
            total
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
};

const createProducts = async(req, res) => {
    const newProduct = new Product(req.body)

    const product = await newProduct.save()
    
    return res.status(200).send({
        ok: true,
        message: 'Producto creado con éxito',
        product
     })
};

const updateProducts = async(req,res) => {
    try {
        const id = req.params.id;
        const dataToUpdadate = req.body;
        const updateProducts = await Product.findByIdAndUpdate(id, dataToUpdadate, { new: true });

        return res.status(200).send({
            ok: true,
            message: 'Producto actualizado',
            updateProducts
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error al intenter actualizar el producto',
            error
        })
    }
};

const deleteProducts = async(req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id);
        return res.status(200).send({
            ok: true,
            message: 'Producto eliminado exitosamente',
            deleteProduct
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error al intentar eliminar el producto',
            error
        })
    }
}

module.exports = {
    getProduct,
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}