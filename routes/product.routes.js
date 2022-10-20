const express = require('express');
const api = express.Router();
const productController = require('../controllers/product.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');


api.get('/products/:id', jwtVerify, productController.getProduct);
api.get('/products', jwtVerify, productController.getProducts);
api.post('/products', [jwtVerify, isAdmin], productController.createProducts);
api.put('/products/:id', [jwtVerify, isAdmin], productController.updateProducts);
api.delete('/products/:id', [jwtVerify, isAdmin], productController.deleteProducts);


module.exports = api