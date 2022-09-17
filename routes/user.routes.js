const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller')

api.get('/user/:userID', userController.getUser);

api.get('/users/:name?', userController.getUsers);

api.post('/users', userController.createUser);

api.put('/users', userController.editUser);

api.delete('/users/:id', userController.deleteUser);

api.post('/login', userController.login);

module.exports = api