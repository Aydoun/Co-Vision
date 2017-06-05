var express = require('express');
var contributions = express.Router();
var test = require('../controllers/testController');

//General Crud Routing
contributions.get('/', test.get);

module.exports = contributions;
