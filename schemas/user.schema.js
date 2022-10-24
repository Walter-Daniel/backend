const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VALID_ROLES = [
    'ADMIN_ROLE',
    'USER_ROLE',
];

const UserSchema = new Schema({
    fullName: { 
        type: String, 
        required: true, 
        minlength: 5, 
        maxlength: 40 
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        index: true, 
    },
    password: { 
        type: String, 
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    role: {
        type: String,
        enum: VALID_ROLES,
        default: VALID_ROLES[1]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    orders: { 
        type: Schema.Types.ObjectId, 
        ref: 'Order',
    },
});

module.exports = mongoose.model('User', UserSchema)