const express = require('express');
const api = express.Router();

const jwtVerify = require('../middlewares/jwt');
const { dashboardData } = require('../controllers/dashboard.controller');

api.get('/dashboard', dashboardData);

module.exports = api;