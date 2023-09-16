const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);;
app.set('view engine', 'ejs');

app.use('/', require('./routes/home'));
app.use('/home', require('./routes/home'));
app.use('/logout', require('./routes/logout'));
app.use('/user', require('./routes/user'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/create', require('./routes/create'));
app.use('/detail', require('./routes/detail'));
app.use('/delete', require('./routes/delete'));
app.use('/update', require('./routes/update'));
app.use('/webflow', require('./routes/webflow'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

const port = process.env.PORT_FRONT || 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

module.exports = app;
