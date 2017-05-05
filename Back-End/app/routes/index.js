var express = require('express');
var AllRoutes = express.Router();

var contributors = require('./contributor');
var visions = require('./vision');
var issues = require('./issue');

AllRoutes.use('/contributor' , contributors);
AllRoutes.use('/issue' , issues);
AllRoutes.use('/vision' , visions);

module.exports = AllRoutes;
