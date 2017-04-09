var express = require('express');
var AllRoutes = express.Router();

var contributors = require('./contributor');
var visions = require('./vision');

AllRoutes.use('/contributor' , contributors);
AllRoutes.use('/vision' , visions);

module.exports = AllRoutes;
