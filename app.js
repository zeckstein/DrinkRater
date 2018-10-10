'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');

// include routes
var routes = require('./routes/index');
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error', err);
});

// listen on port 3000
app.listen(3000, () => {
  console.log('Express app listening on port 3000');
});