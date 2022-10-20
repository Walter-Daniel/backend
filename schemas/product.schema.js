const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 40 
    },
    detail: { 
        type: String, 
        required: true,
        maxlength: 250,
        default: 'Sin descripcion.',
    },
    price: { 
        type: Number, 
        required: true,
        min: [0, 'El valor debe ser mayor a 0.'],
        max: [10000, 'El valor no debe superar los 10000.'],
        match: [/(^\d{1,10})/, 'Solo números enteros y positivos.']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Debe seleccionar una categoría.'],
        ref: 'Category',
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', ProductSchema)