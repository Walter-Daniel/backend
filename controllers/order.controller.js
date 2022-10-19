const Order = require('../schemas/orders.schema');

async function createOrder(req, res) {
    try {
        let order = new Order(req.body);
        const newOrder = await order.save();
        return res.status(200).send({
            ok: true,
            message: 'Orden creada correctamente',
            order: newOrder
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: `No se pudo crear la orden`
        })
    }
}

async function getOrders(req, res) {
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
            message: `No se pudieron obtener las ordenes`
        })
    }
}

async function updateOrders(req, res) {
    if(req.user._id !== id && req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).send({
            ok: false,
            message: 'No tienes permisos para modificar esta orden'
        })
    }

    const newOrder = await User.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).send({
        message: 'Orden editada',
        newOrder
    });
};

module.exports = {
    createOrder,
    getOrders,
    updateOrders,
}