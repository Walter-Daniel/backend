const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const OrderSchema = new Schema({
    products: [
        {
            productId: {type: String, ref: 'Product'},
            quantity: {type: Number},
            price: {type: Number},
            totalPrice: {type: Number}
        },
    ],
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    user: { type: String, ref: 'User', required: true},
    createdAt: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Order', OrderSchema)