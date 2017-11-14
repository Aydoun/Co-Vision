const express = require('express');
const logger = require('morgan');
const path = require('path');
const compression = require ('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./app/routes');
const notFound = require('./app/routes/notFound');
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

const preCheck = (req, res, next) => {
   next();
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
