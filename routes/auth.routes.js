const express = require('express');
const api = express.Router();
const authController = require('../controllers/auth.controller');
const userLoginValidator = require('../middlewares/checkValidation');
const validate = require('../middlewares/fieldValidation')


api.post('/register', authController.register);

// api.post('/login', userLoginValidator, validate , authController.login );

module.exports = api