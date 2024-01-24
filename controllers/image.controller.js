import { request, response } from 'express';
const Product = require('../schemas/product.schema');
const Image = require('../schemas/image.schema');

import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

const uploadImagesCloudinary = async(req=request, res=response ) => {
    
    try {
        
        const {id} = req.params;
        
        if(!req.files){
            return res.status(400).send({
                ok: false,
                message: 'No se ingresó ninguna imagen',
            })
        }

        const { image } = req.files
        const allowedExtensions = ['.jpg', '.jpeg', '.avif', '.png'];
        const fileExtension = image.name.substring(image.name.lastIndexOf('.')).toLowerCase();
    
        if (!allowedExtensions.includes(fileExtension)) {
            return res.status(400).send({
                ok: false,
                message: 'Extensión no válida',
            })
        };

        const product = await Product.findById(id);
        
        if(product.image){
            const nameArr = product.image.split('/');
            const name = nameArr[nameArr.length -1];
            const [public_id] = name.split('.');
            cloudinary.uploader.destroy(public_id);
        }

        const { secure_url } =  await cloudinary.uploader.upload(tempFilePath);
        product.image = secure_url;
        await product.save();
        
        return res.status(200).send({
            ok: true,
            message: 'Imagen subida con éxito'
         })
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: 'Error al intenter actualizar el producto',
            error
        })
    }
};

module.exports = {
   uploadImagesCloudinary
}