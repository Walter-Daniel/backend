const express = require('express');
const api = express.Router();
const productController = require('../controllers/product.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');
const { check } = require('express-validator');
const { existCategory } = require('../middlewares/dbValidation');
const validate = require('../middlewares/fieldValidation');


api.get('/products/:id', jwtVerify, productController.getProduct);
api.get('/products', 
// jwtVerify,
 productController.getProducts);
api.post('/products', [
    // jwtVerify, 
    // isAdmin,
    check('name').notEmpty().isString().isLength({min: 5, max:40}).withMessage('El nombre del producto debe tener entre 5 y 40 carácteres'),
    check('detail', 'La descripción es obligatoria. No debe superar los 250 caracteres.').notEmpty(),
    check('price').isNumeric().withMessage('Ingrese números').isInt({ min: 1, max: 10000 }).withMessage('El precio ingresado debe ser entre 1 y 10.000'),
    check('promo').isBoolean().withMessage('Debe ingresar verdadero o falso para la promoción'),
    check('category').isMongoId().withMessage('No es un id válido'),
    check('category').custom(existCategory),
    validate
], productController.createProducts);
api.put('/products/:id', [jwtVerify, isAdmin], productController.updateProducts);
api.delete('/products/:id', [jwtVerify, isAdmin], productController.deleteProducts);


module.exports = api