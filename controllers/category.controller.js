async function getCategory(req, res) {
    try {
        const orders = await Order.find().populate('user', { password: 0 }).populate('products.productId', '_id name detail');
        return res.status(200).send({
            ok: true,
            message: `Ordenes obtenidas correctamente`,
            orders
        })
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: `No se pudieron obtener las categorías`
        })
    }
}

