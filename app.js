//这个项目是用express+ejs构建一个完整的网站，包括了数据库
/*实现登陆注册和注册所需要的的访问方法，安全退出
 * res.redirect()用于跳转，可以用app.set设置基础地址basepath
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var routes = require('./routes/index');
var reg    = require('./routes/reg');
var login  = require('./routes/login');
var logout = require('./routes/logout');
var exper  = require('./routes/exper');
var uploadReport  = require('./routes/uploadReport');
var about  = require('./routes/about');
var services= require('./routes/services');
var contact= require('./routes/contact');

//新界面调试用
var exper0  = require('./routes/exper');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('Wilson'));
//app.use(express.cookieParser('Wilson'));
app.use(session());

//app.use(session({secret:'wilson'}));
app.use(express.static(path.join(__dirname, 'public')));

//Add highcharts path to static route
app.use('/highcharts', express.static(__dirname + '/node_modules/highcharts/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/'));


app.use('/', routes);
app.use('/reg',reg);
app.use('/login',login);
app.use('/logout',logout);
app.use('/exper',exper);
app.use('/about',about);
app.use('/services',services);
app.use('/contact',contact);

app.use('/uploadReport',uploadReport);

app.use('/exper0', exper0);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

