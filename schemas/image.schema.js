import { Schema, model } from 'mongoose';

const ImageSchema = Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    }
});

module.exports = model('Image', ImageSchema);