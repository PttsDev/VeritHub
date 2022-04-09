var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// express server
var app = express();

// get route
app.get('/', function(req, res, next) {
  res.send('Hello World!');
});

// listen
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
  console.log('Go to http://localhost:3000');
});
