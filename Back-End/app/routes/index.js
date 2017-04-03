var express = require('express');
var AllRoutes = express.Router();

var notices = require('./notice');

AllRoutes.use('/notice' , notices);

module.exports = AllRoutes;
