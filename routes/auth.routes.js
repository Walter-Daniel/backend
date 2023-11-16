const express = require('express');
const api = express.Router();

const validate = require('../middlewares/fieldValidation');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { createUser } = require('../controllers/user.controller');
const { existEmail } = require('../middlewares/dbValidation');

api.post('/register', [
    check('fullName').notEmpty().withMessage('Ingrese nombre y apellido').isLength({ min: 5, max: 40 }).withMessage('Debe ingresar entre 5 y 40 caracteres'),
    check('email', 'Ingrese un email válido.').isEmail(),
    check('email').custom(existEmail),
    check('password', 'El password es obligatorio').exists(),
    check('password').isLength({ min: 4, max: 9 }).withMessage('Longitud del password es inválida'),
    validate 
], createUser);

api.post('/login', [
    check('email', 'Ingrese un email válido.').isEmail(),
    check('password', 'El password es obligatorio').exists(),
    check('password').isLength({ min: 4, max: 9 }).withMessage('Longitud del password es inválida'),
    validate 
], login );

module.exports = api