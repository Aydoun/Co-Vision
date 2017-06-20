var express = require('express');
var tests = express.Router();

var {testify} = require('../controllers/testController');


tests.get('/', testify);

module.exports = tests;
