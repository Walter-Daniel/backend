const express = require('express');
const api = express.Router();

const validate = require('../middlewares/fieldValidation');
const { check } = require('express-validator');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

const { uploadImagesCloudinary } = require('../controllers/image.controller');


api.post('/images', [
    // jwtVerify, 
    // isAdmin,
    // check('title')
    //     .notEmpty().withMessage('Debe ingresar el titulo.')
    //     .isLength({min:2, max:20}).withMessage('El nombre debe tener entre 2 y 20 caracteres.')
    //     .matches(/^[a-zA-Z ]*$/).withMessage('El nombre solo debe contener letras.'),
    // check('url').notEmpty().withMessage('Debe ingresar la url'),
   
    // validate
], uploadImagesCloudinary);



module.exports = api;