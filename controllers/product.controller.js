const Product = require('../schemas/product.schema');

const getProduct = async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(product) return res.status(404).json({
        ok: false,
        message: 'No se encontró ningún producto'
    });
    return res.status(200).json({
        ok: true,
        message: 'Producto encontrado',
        product
    });
};

const getProducts = async(req, res) => {
    let categoryID = req.query.categoryID;
    let products;
    try {
        
        // Object.keys(searchCriteria).forEach(key => {
        //     searchCriteria[key] = new RegExp(req.query[key], 'i');
        // })

        // const [ products, allProducts, total ] = await Promise.all([
        //     Product.find({ active: true }).sort({ createdAt: -1 }).populate('category', '_id name'),
        //     Product.find({category: categoryID}).sort({ createdAt: -1 }),
        //     Product.find().countDocuments()
        // ])

        if (categoryID) {
            products = await Product.find({ 'category': categoryID }).sort({ createdAt: -1 }).populate('category', '_id name');
        } else {
            products = await Product.find().sort({ createdAt: -1 }).populate('category', '_id name');
        }

        return res.status(200).json({
            message: 'Productos obtenidos correctamente',
            products
        })
        
    } catch (error) {
        return res.status(400).json(error)
    }
};

const createProducts = async(req, res) => {
   try {
    const uploadProduct = new Product(req.body)
    const product = await uploadProduct.save();
    
    return res.status(200).json({
        ok: true,
        message: 'Producto creado con éxito',
        product
     })

   } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al intenter crear el producto',
        })
   }
};

const updateProducts = async(req,res) => {
    try {
        const id = req.params.id;
        const dataToUpdadate = req.body;

        if(dataToUpdadate.promo){
            const promoCount = await Product.find({ 'promo': true, 'category._id': dataToUpdadate.category._id });
            if(promoCount.length >= 3){
                return res.status(409).json({
                    ok: false,
                    message: 'No puede haber más de 3 promos por categoria',
                })        
            }
        }   

        const updateProducts = await Product.findByIdAndUpdate(id, dataToUpdadate, { new: true });
        return res.status(200).json({
            ok: true,
            message: 'Producto actualizado',
            updateProducts
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error al intenter actualizar el producto',
            error
        })
    }
};

const deleteProducts = async(req, res) => {
    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndUpdate({_id: id}, {active: false});
        return res.status(200).json({
            ok: true,
            message: 'Producto eliminado exitosamente',
            deleteProduct
        })
    } catch (error) {
        return res.status(500).json({
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