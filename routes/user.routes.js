const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller')

api.get('/user', userController.getUser);
api.get('/users', userController.getUsers);
api.post('/users', userController.createUser);
api.put('/users', userController.editUser);
api.delete('/users', userController.deleteUser);
api.post('/login', userController.login);

module.exports = api