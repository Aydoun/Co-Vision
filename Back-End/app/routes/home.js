var express = require('express');
var home = express.Router();

var {get , testify} = require('../controllers/homeController');
home.get('/', get);
home.get('/test', testify);

module.exports = home;
