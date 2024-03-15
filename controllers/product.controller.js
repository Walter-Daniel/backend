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

    let category = req.query.category;
    let filter = category ? { category } : {};
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    try {
        
        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
            .sort({ createdAt: -1 }) 
            .populate('category', '_id name')
            .skip((page - 1) * pageSize)
            .limit(pageSize),
            Product.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(totalProducts / pageSize);
        
        return res.status(200).json({
            message: 'Productos obtenidos correctamente',
            products,
            totalProducts,
            totalPages
        })
        
    } catch (error) {
        return res.status(400).json(error)
    }
};

const getPromos= async(req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    try {
        
        const [ promoProducts, totalPromoProducts] = await Promise.all([
            Product.find({ promo: true })
            .sort({ createdAt: -1 }) 
            .populate('category', '_id name')
            .skip((page - 1) * pageSize)
            .limit(pageSize),
            Product.countDocuments({ promo: true })
        ]);

        const totalPages = Math.ceil(totalPromoProducts / pageSize);
        
        return res.status(200).json({
            message: 'Promociones obtenidos correctamente',
            promoProducts,
            totalPromoProducts,
            totalPages
        })
        
    } catch (error) {
        return res.status(400).json(error)
    }
};

const createProducts = async(req, res) => {
   try {

    const infoToUpload = req.body

    if(infoToUpload.promo){
        const promoCount = await Product.find({ 'promo': true, 'category._id': infoToUpload.category._id });
        if(promoCount.length >= 3){
            return res.status(409).json({
                ok: false,
                message: 'No puede haber más de 3 promos por categoría',
            })        
        }
    }   

    const uploadProduct = new Product(req.body);
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
    deleteProducts,
    getPromos
}