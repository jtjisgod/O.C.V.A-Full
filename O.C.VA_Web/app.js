global.apiUrl = "222.118.108.145:2222"

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var apiRoutes = require('./routes/api');
var sha256 = require('sha256');

var app = express();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser());
app.use(session({
  key: 'ocva', // 세션키
  secret: 'ocvasecret', // 비밀키
  cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
  }
}));
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', apiRoutes);
app.use('/api/v1', apiRoutes);


app.use('/api', function(req, res){
  var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] 
              || req.connection.remoteAddress;
  req.headers['x-forwarded-for-client-ip'] = ip;
  // console.log('API REQUEST');
  // console.log(ip);
  proxy.web(req, res, {
      target: global.apiUrl
  }); 
  proxy.on('error', function(e) {
      console.log(e);    
  }); 
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// console.log(sha256("젠장"));


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
