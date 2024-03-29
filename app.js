
/**
 * Module dependencies.
 */
var db = require('./dbConnection.js');
var express = require('express')
//  , routes = require('./routes')
  , days = require('./routes/days')
    , badges = require('./routes/badges')
  , http = require('http')
  , path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'jshtml');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//app.get('/', routes.index);
app.get('/days', days.list);
app.get('/days/:year(\\d+)', days.day);
app.get('/days/:year(\\d+)/:month(\\d+)', days.day);
app.get('/days/:year(\\d+)/:month(\\d+)/:day(\\d+)', days.day);

app.get('/badges', badges.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
