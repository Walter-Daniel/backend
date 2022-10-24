const express = require('express');
const api = express.Router();
const orderController = require('../controllers/order.controller')

api.get('/orders', [jwtVerify, isAdmin], orderController.getOrders)
api.post('/orders', [jwtVerify, isAdmin], orderController.createOrder)
api.put('/orders', [jwtVerify, isAdmin], orderController.updateOrders)

module.exports = api