const AllRoutes = require('express').Router();

const { LogIn, Register } = require('../controllers/userController');
const { uploadFile } = require('../controllers/fileController');
const config = require('../config');
const users = require('./user');
const visions = require('./vision');
const invitations = require('./invitation');
const feedbacks = require('./feedback');
const messages = require('./message');
const discover = require('./discover');
const tests = require('./test');

AllRoutes.post('/login', LogIn);
AllRoutes.post('/register', Register);
AllRoutes.post('/upload', uploadFile);

AllRoutes.use('/user' , users);
AllRoutes.use('/invitation' , invitations);
AllRoutes.use('/feedback' , feedbacks);
AllRoutes.use('/vision' , visions);
AllRoutes.use('/message' , messages);
AllRoutes.use('/discover' , discover);
AllRoutes.use('/test' , tests);

module.exports = AllRoutes;
