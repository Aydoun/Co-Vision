var express = require('express');
var AllRoutes = express.Router();

var users = require('./user');
var visions = require('./vision');
var invitations = require('./invitation');
var feedbacks = require('./feedback');
var tests = require('./test')

AllRoutes.use('/user' , users);
AllRoutes.use('/invitation' , invitations);
AllRoutes.use('/feedback' , feedbacks);
AllRoutes.use('/vision' , visions);
AllRoutes.use('/test' , tests);

module.exports = AllRoutes;
