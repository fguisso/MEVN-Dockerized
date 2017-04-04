'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.items = exports.users = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = _q2.default.Promise;

var dbUri = process.env.DB_URI || 'mongodb://localhost:27017/haoc';

_mongoose2.default.connect(dbUri);

_mongoose2.default.connection.on('connected', function () {
  return console.log('Mongoose default connection open to ', dbUri);
});

_mongoose2.default.connection.on('error', function (err) {
  return console.log('Mongoose default connection error: ', err);
});

_mongoose2.default.connection.on('disconnected', function () {
  return console.log('Mongoose default connection disconnected');
});

_mongoose2.default.connection.on('open', function () {
  return console.log('Mongoose default connection is open');
});

process.on('SIGINT', function () {
  return _mongoose2.default.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

var users = require('./users.model.js');
var items = require('./items.model.js');

exports.users = users;
exports.items = items;
//# sourceMappingURL=db-connection.js.map
