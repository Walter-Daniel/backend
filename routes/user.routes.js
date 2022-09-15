const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller')

api.get('/user', userController.getUser);
api.get('/users', userController.getUsers);
api.post('/user', userController.createUser);
api.put('/user', userController.editUser);
api.delete('/user', userController.deleteUser);
api.post('/login', userController.login);

module.exports = api
