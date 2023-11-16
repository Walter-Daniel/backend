const express = require('express');
const api = express.Router();

const { createCategory, updateCategory, getCategory, deleteCategory } = require('../controllers/category.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

api.get('/category',[
    // jwtVerify
], getCategory)

api.post('/category', [
    // jwtVerify, isAdmin
], createCategory);

api.put('/category/:id', [jwtVerify, isAdmin], updateCategory);

api.delete('/category/:id', [jwtVerify, isAdmin], deleteCategory);

module.exports = api;