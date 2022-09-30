const express = require('express');
const api = express.Router();
const orderController = require('../controllers/order.controller')

api.get('/categories/:name', orderController.getOrders)

module.exports = api