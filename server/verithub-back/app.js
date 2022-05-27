const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

// express server
const app = express();
app.use(logger('combine'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
// routes

const register = require('./routes/register');
const login = require('./routes/login');
const institution = require('./routes/institution');
const user = require('./routes/user');

app.use('/register', register);
app.use('/login', login);
app.use('/institution', institution);
app.use('/user', user);


// get route
app.get('/', function(req, res, next) {
  res.send('Hello World!');
});

// listen
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
  console.log('Go to http://localhost:3000');
});

