'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var secret = process.env.SECRET;

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || '0.0.0.0');

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.get('/', function (req, res) {
  return res.send('Hello World!');
});

app.use('/users', (0, _expressJwt2.default)({ secret: secret }).unless({ path: ['/users/auth', '/users/init', '/users/register'] }));

app.use('/items', (0, _expressJwt2.default)({ secret: secret }));
app.use('/info', (0, _expressJwt2.default)({ secret: secret }));

app.use('/users', require('./controllers/users.controller.js'));
app.use('/items', require('./controllers/items.controller.js'));
app.use('/info', require('./controllers/infos.controller.js'));

var server = app.listen(app.get('port'), app.get('host'), function () {
  return console.log('\nServer listening at http://' + server.address().address + ':' + server.address().port);
});
//# sourceMappingURL=server.js.map
