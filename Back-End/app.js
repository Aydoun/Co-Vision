var express = require('express');
var logger = require('morgan');
var argv = require('minimist')(process.argv.slice(2));
var compression = require ('compression');
var bodyParser = require('body-parser');
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
subpath.use('/', routes);
subpath.use('*', home);

swagger.setApiInfo({
        title: "example API",
        description: "API to do something, manage something...",
        termsOfServiceUrl: "",
        contact: "yourname@something.com",
        license: "",
        licenseUrl: ""
});

app.get('/api-docs', function (req, res) {
            res.sendFile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');




  // Start the web server
    //app.listen(port);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = {
  app : app,
  swagger : swagger
};
