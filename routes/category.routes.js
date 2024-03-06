const express = require('express');
const api = express.Router();

const validate = require('../middlewares/fieldValidation');
const { check } = require('express-validator');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

const { createCategory, updateCategory, getCategory, deleteCategory } = require('../controllers/category.controller');
const { existUser } = require('../middlewares/dbValidation');

api.get('/categories',[
    // jwtVerify,
    // isAdmin,
], getCategory)

api.post('/categories', [
    jwtVerify, 
    isAdmin,
    check('name')
        .notEmpty().withMessage('Debe ingresar el nombre de la categoría.')
        .isLength({min:2, max:20}).withMessage('El nombre debe tener entre 2 y 20 caracteres.')
        .matches(/^[a-zA-Z ]*$/).withMessage('El nombre solo debe contener letras.'),
    check('user').isMongoId().withMessage('Id no válido')
        .custom(existUser),
    validate
], createCategory);

api.put('/categories/:id', [jwtVerify, isAdmin], updateCategory);

api.delete('/categories/:id', [jwtVerify, isAdmin], deleteCategory);

module.exports = api;