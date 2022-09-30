const express = require('express');
const api = express.Router();
const authController = require('../controllers/auth.controller');
const userLoginValidator = require('../middlewares/userValidator');
const validate = require('../middlewares/validate')


api.post('/register', authController.register);

api.post('/login', userLoginValidator(), validate , authController.login );

module.exports = api