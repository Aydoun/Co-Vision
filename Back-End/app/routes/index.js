var express = require('express');
var AllRoutes = express.Router();

var {LogIn, Register } = require('../controllers/contributorController');
var config = require('../config');
var contributors = require('./contributor');
var contributions = require('./contribution');
var visions = require('./vision');
var invitations = require('./invitation');
var issues = require('./issue');
var feedbacks = require('./feedback');
var tests = require('./test');

AllRoutes.post('/login', LogIn);
AllRoutes.post('/register', Register);

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


AllRoutes.use('/contributor' , contributors);
AllRoutes.use('/contribution' , contributions);
AllRoutes.use('/issue' , issues);
AllRoutes.use('/invitation' , invitations);
AllRoutes.use('/feedback' , feedbacks);
AllRoutes.use('/vision' , visions);
AllRoutes.use('/test' , tests);

module.exports = AllRoutes;
