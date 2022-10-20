const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'La descripción es necesaria.'],
        minlength: [2, 'El nombre de la categoría debe tener al menos 2 caracteres.'],
        maxlength: [20, 'El nombre de la categoría no debe superar los 20 caracteres.'],
        match: [/^[a-zA-Z ]*$/, 'Sólo puede contener letras.'],
        unique: true
      },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    products: { 
        type: String, 
        ref: 'Product', 
    },
    createdAt: { 
        type: Date,
        default: Date.now, 
        required: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
});

module.exports = mongoose.model('Category', CategorySchema)