const express = require('express');
const api = express.Router();
const { check } = require('express-validator');

const { getOrder, getOrders, createOrder, updateOrders  } = require('../controllers/order.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');
const { hasARole, existUser, existProduct } = require('../middlewares/dbValidation');
const validate = require('../middlewares/fieldValidation');


api.get('/order/:id', jwtVerify, getOrder)
api.get('/orders', [jwtVerify, isAdmin], getOrders)
api.post('/orders', [
    // jwtVerify,
    // hasARole,
    check('products.*.productId').isMongoId().withMessage('Id no válido'),
    check('products.*.productId').custom(existProduct).withMessage('El producto no se encuentra registrado en la base de datos'),
    check('products.*.quantity').isInt({min:1, max:15}).withMessage('Ingresar un número entero entre 1 y 15.'),
    check('user').isMongoId().withMessage('Id no válido'),
    check('user').custom(existUser),
    check('total').isNumeric().withMessage('Solo ingresar números').isFloat({min:1000, max:100000}).withMessage('Ingrese precio final, debe ser mayor a 1000'),
    validate
], createOrder)
api.put('/orders/:id', [jwtVerify, isAdmin], updateOrders)

module.exports = api