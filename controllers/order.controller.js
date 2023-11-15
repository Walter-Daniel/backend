const Order = require('../schemas/orders.schema');

async function createOrder(req, res) {
    try {
        const { user } = req.body;
       
        let order = new Order(req.body);
        const newOrder = await order.save();
        
        // user.orders = user.orders.concat(newOrder._id)
        // await user.save()
        return res.status(200).send({
            ok: true,
            message: 'Orden creada correctamente',
            order: newOrder
        })
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: `No se pudo crear la orden`,
            error
        })
    }
};

async function getOrder(req, res) {

    const id = req.params.id;
    const user = await Order.findById(id).populate('user', { password: 0 });
    if(!user) return res.status(404).send({
        ok: false,
        message: `No se encontró ninguna orden con el id: ${id}`
    });
    return res.status(200).send({
        message: 'Orden encontrada',
        user
    });
};

async function getOrders(req, res) {
    try {
        const orders = await Order.find()
                                  .sort({ createdAt: -1 })
                                  .populate('user', { password: 0 })
                                  .populate('products.productId', '_id name detail');
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

   try {
    const id = req.params.id;

    if(req.user._id !== id && req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).send({
            ok: false,
            message: 'No tienes permisos para modificar esta orden'
        })
    }

    const newOrder = await Order.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(200).send({
        ok: true,
        message: 'Orden editada',
        newOrder
    });
   } catch (error) {
    return res.status(500).send({
        ok: false,
        message: 'Error al intentar editar la orden',
        error
    });
   }
};

module.exports = {
    getOrder,
    createOrder,
    getOrders,
    updateOrders,
}