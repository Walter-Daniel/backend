const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const status = [
    'Pending',
    'Placed',
    'Cancelled',
];

const OrderSchema = new Schema({
    products: [
        {
            productId: {type: String, ref: 'Product', required: true},
            quantity: {type: Number, required: true},
        },
    ],
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: status,
        default: status[0],
    },
    createdAt: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Order', OrderSchema)