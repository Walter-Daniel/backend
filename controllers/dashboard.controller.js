const Product = require('../schemas/product.schema');
const Order = require('../schemas/orders.schema');
const Category = require('../schemas/category.schema');
const User = require('../schemas/user.schema');


async function dashboardData(req, res){

    try {

        const [ products, orders, categories, users ] = await Promise.all([

            Product.find().select('_id name price'),
            Order.find().select('_id user total'),
            Category.find().select('_id name active'),
            User.find().select('_id fullName email'),
   
        ])

        const total = {
            totalProducts: products.length,
            totalOrders: orders.length,
            totalCategories: categories.length,
            totalUsers: users.length
        }

        const lastAdded = {
            product: products[products.length - 1],
            order: orders[orders.length - 1],
            category: categories[categories.length - 1],
            user: users[users.length - 1]
        }

        return res.status(200).json({
            ok:true,
            message: 'Información obtenida',
            total,
            lastAdded
        })

       
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error al intentar actualizar la categoría',
            error
        })
    }
};

module.exports = {
    dashboardData
}