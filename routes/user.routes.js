const express = require('express');
const api = express.Router();
const userController = require('../controllers/user.controller');
const jwtVerify = require('../middlewares/jwt');
const isAdmin = require('../middlewares/isAdmin');

api.get('/user/:userID', jwtVerify, userController.getUser);

api.get('/users/:name?', jwtVerify, userController.getUsers);

api.put('/users', [jwtVerify], userController.editUser);

api.delete('/users/:id', [jwtVerify, isAdmin], userController.deleteUser);

module.exports = api