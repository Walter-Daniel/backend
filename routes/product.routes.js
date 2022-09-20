const express = require('express');
const api = express.Router();
const productController = require('../controllers/product.controller')


// api.get('/products', userController.getproduct);
api.get('/products', productController.getProducts);
api.post('/products', productController.createProduct);
// api.put('/products', userController.editUser);
// api.delete('/products', userController.deleteUser);


module.exports = api