const express = require('express');
const api = express.Router();
const orderController = require('../controllers/order.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

api.get('/categories', categoryController.getCategory)

api.post('/products', category.createProduct);

api.put('/users', [jwtVerify, isAdmin], categoryController.editCategory);

api.delete('/users/:id', [jwtVerify, isAdmin], categoryController.deleteCategory);

module.exports = api