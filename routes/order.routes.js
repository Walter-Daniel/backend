const express = require('express');
const api = express.Router();

const { getOrder, getOrders, createOrder, updateOrders  } = require('../controllers/order.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');
const { hasARole } = require('../middlewares/dbValidation');


api.get('/order/:id', jwtVerify, getOrder)
api.get('/orders', [jwtVerify, isAdmin], getOrders)
api.post('/orders', [
    jwtVerify,
    hasARole
], createOrder)
api.put('/orders/:id', [jwtVerify, isAdmin], updateOrders)

module.exports = api