var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');

// var mongoose = require('mongoose');
// var mongoURI = process.env.MONGOURI || require("./secrets").mongoURI;

var bodyParser = require('body-parser');
var organizationRouter = require('./routers/organization.router');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// //connect to the database
// mongoose.connect(mongoURI, {}).then(
//   () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
//     console.log('mongo is connected');
//   },
//   err => { /** handle initial connection error */
//     console.log('error w mongo: ' + err);
//   }
// );

// Routes
app.use(organizationRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
