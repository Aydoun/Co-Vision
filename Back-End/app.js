var express = require('express');
var logger = require('morgan');
var argv = require('minimist')(process.argv.slice(2));
var compression = require ('compression');
var bodyParser = require('body-parser');
var cors = require('cors')
var routes = require('./app/routes');
var home = require('./app/routes/home');
var app = express();
var subpath = express();
var swagger = require('swagger-node-express').createNew(subpath);

// view engine setup
app.set('view engine', 'pug');
app.use(express.static('dist'));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", subpath);
subpath.use(cors());
subpath.use('/', routes);
subpath.use('*', home);

swagger.setApiInfo({
        title: "Co-Vision Rest API",
        description: "Back End For My Visionary Project",
        contact: "aydoun@qq.com",
});

app.get('/api-docs', function (req, res) {
        res.sendFile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

module.exports = {
  app : app,
  swagger : swagger
};
