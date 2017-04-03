var express = require('express');
var AllRoutes = express.Router();

var contributors = require('./contributor');

AllRoutes.use('/contributor' , contributors);

module.exports = AllRoutes;
