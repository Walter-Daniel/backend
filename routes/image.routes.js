const express = require('express');
const api = express.Router();

const { check } = require('express-validator');
const validate = require('../middlewares/fieldValidation');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');
const { imageValidation } = require('../middlewares/dbValidation'); 

const { uploadImagesCloudinary, updateImages } = require('../controllers/image.controller');


api.post('/images', [
    jwtVerify, 
    isAdmin,
    check('image').custom(imageValidation),
    validate
], uploadImagesCloudinary);

api.put('/images', [
    jwtVerify, 
    isAdmin,
    check('title')
        .notEmpty().withMessage('Debe ingresar el titulo.')
        .isLength({min:2, max:20}).withMessage('El nombre debe tener entre 2 y 20 caracteres.')
        .matches(/^[a-zA-Z ]*$/).withMessage('El nombre solo debe contener letras.'),
    check('url').notEmpty().withMessage('Debe ingresar la url'),
   
    validate
], updateImages);



module.exports = api;