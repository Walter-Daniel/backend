const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');
const { validationResult }= require('express-validator');
const { check } = require('express-validator')
const { userLoginValidator, validate } = require('../middlewares/userValidator');

api.get('/user/:userID', jwtVerify, userController.getUser);

api.get('/users/:name?', jwtVerify, userController.getUsers);

api.post('/users', userController.createUser);

api.put('/users', [jwtVerify], userController.editUser);

api.delete('/users/:id', [jwtVerify, isAdmin], userController.deleteUser);

api.post('/login', userController.login);

module.exports = api