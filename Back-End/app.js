const express = require('express');
const logger = require('morgan');
const path = require('path');
const jwt = require('jwt-simple');
const config = require('./app/config');
const compression = require ('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes');
const notFound = require('./app/routes/notFound');
const { LogIn, Register } = require('./app/controllers/userController');
const { defaultUploadPath } = require('./app/lib');

const app = express();
const subpath = express();
const swagger = require('swagger-node-express').createNew(subpath);

// view engine setup
app.set('view engine', 'pug');
app.use('/media', express.static(`${defaultUploadPath()}`))
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({limit: "2mb"}));
app.use(bodyParser.urlencoded({limit: "2mb", extended: false, parameterLimit:50}));
app.use("/api", subpath);
subpath.use(cors());

subpath.post('/login', LogIn);
subpath.post('/register', Register);


const preCheck = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  //decode token
  // next();
  if (token) {
    try {
      const decoded = jwt.decode(token, config.secret);
      // return res.status(200).send(decoded);
      if (decoded.exp <= Date.now()) {
        return res.status(403).send('Access token has expired');
      } else {
        //  save user id in the request object
        req.tokenData = decoded;
        next();
      }
    } catch (err) {
        return res.status(403).send({
            status: false,
            message: 'Invalid Token'
        });
    }
  } else {
    return res.status(403).send({
        status: false,
        message: 'No token provided.'
    });
  }
}

subpath.use('/', preCheck, routes);
subpath.use('*', notFound);

swagger.setApiInfo({
        title: "Co-Vision Rest API",
        description: "Back End For My Visionary Project",
        contact: "aydoun@qq.com",
});
app.get('/api-docs', function (req, res) {
        res.sendFile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('/api-docs', 'api-docs', '');

module.exports = {
  app : app,
  swagger : swagger
};
