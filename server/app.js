var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var homeRouter = require('./routes/home');
var userRouter = require('./routes/user');
var registerRouter = require('./routes/register');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);;
app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/home', homeRouter);
app.use('/user', userRouter);
app.use('/register', (req, res, next) => {
  res.locals.baseUrl = process.env.BASE_URL || '';
  next();
}, registerRouter);

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

var port = process.env.PORT_FRONT || 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

module.exports = app;
