var express = require('express');
var home = express.Router();

var homeController = require('../controllers/homeController');
home.get('/', homeController.get);

module.exports = home;
