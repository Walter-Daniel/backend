const express = require('express');
const api = express.Router();
const categoryController = require('../controllers/category.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

api.get('/category/:id',jwtVerify, categoryController.getCategory)

api.post('/category', categoryController.createCategory);

api.put('/category/:id', [jwtVerify, isAdmin], categoryController.updateCategory);

api.delete('/category/:id', [jwtVerify, isAdmin], categoryController.deleteCategory);

module.exports = api