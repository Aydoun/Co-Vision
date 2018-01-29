const AllRoutes = require('express').Router();
const config = require('../config');
const users = require('./user');
const visions = require('./vision');
const invitations = require('./invitation');
const feedbacks = require('./feedback');
const messages = require('./message');
const discover = require('./discover');
const tests = require('./test');


AllRoutes.use('/user' , users);
AllRoutes.use('/invitation' , invitations);
AllRoutes.use('/feedback' , feedbacks);
AllRoutes.use('/vision' , visions);
AllRoutes.use('/message' , messages);
AllRoutes.use('/discover' , discover);
AllRoutes.use('/test' , tests);

module.exports = AllRoutes;
