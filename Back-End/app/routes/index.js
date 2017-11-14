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

// AllRoutes.use((req , res , next) => {
//     const token = req.body.token || req.query.token || req.headers['x-access-token'];
//
// //    next();
//     //decode token
//     if (token) {
//       try {
//         const decoded = jwt.decode(token, config.secret);
//
//         if (decoded.exp <= Date.now()) {
//           res.end('Access token has expired', 400);
//         } else {
//           //  save user id in the request object
//           req.userId = decoded.iss;
//           next();
//         }
//       } catch (err) {
//           return res.status(403).send({
//               status: false,
//               message: 'Invalid Token'
//           });
//       }
//     } else {
//       return res.status(403).send({
//           status: false,
//           message: 'No token provided.'
//       });
//     }
// });
