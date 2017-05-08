var express = require('express');
var AllRoutes = express.Router();

var contributors = require('./contributor');
var contributions = require('./contribution');
var visions = require('./vision');
var invitations = require('./invitation');
var issues = require('./issue');
var feedbacks = require('./feedback');

AllRoutes.use('/contributor' , contributors);
AllRoutes.use('/contribution' , contributions);
AllRoutes.use('/issue' , issues);
AllRoutes.use('/invitation' , invitations);
AllRoutes.use('/feedback' , feedbacks);
AllRoutes.use('/vision' , visions);

module.exports = AllRoutes;
