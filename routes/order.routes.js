const express = require('express');
const api = express.Router();
const orderController = require('../controllers/order.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

api.get('/orders', [jwtVerify, isAdmin], orderController.getOrders)
api.post('/orders', [jwtVerify, isAdmin], orderController.createOrder)
api.put('/orders/:id', [jwtVerify, isAdmin], orderController.updateOrders)

module.exports = api