'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _dbConnection = require('../models/db-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = {};

var secret = process.env.SECRET;

var auth = function auth(email, password) {
  var deferred = _q2.default.defer();

  var authenticate = function authenticate() {
    _dbConnection.users.findOne({ email: email }, { hash: 1, admin: 1 }, function (err, user) {
      _bcryptjs2.default.compare(password, user.hash).then(function (res) {
        if (user && res) deferred.resolve({ token: _jsonwebtoken2.default.sign({ sub: user._id }, secret), isAdmin: user.admin });
        if (!res) deferred.reject('Password incorrect!');else deferred.resolve('Nothing to show here!');
      }).catch(function (e) {
        return deferred.reject(e.name + ' : ' + e.message);
      });
      if (err) deferred.reject(err.name + ' : ' + err.message);
    });
  };

  _dbConnection.users.findOne({ email: email }, function (err, user) {
    if (!user) deferred.reject('E-mail ' + email + ' not exist.');
    if (err) deferred.reject(err.name + ' : ' + err.message + ': ' + err);else authenticate();
  });

  return deferred.promise;
};

var list = function list() {
  var deferred = _q2.default.defer();

  _dbConnection.users.find({}, { hash: 0 }, function (err, users) {
    if (err) deferred.reject(err.name + ' : ' + err.message);
    if (users) deferred.resolve(users);else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

var getById = function getById(_id) {
  var deferred = _q2.default.defer();
  console.log(_id);
  _dbConnection.users.findById(_id, { hash: 0 }, function (err, user) {
    if (err) deferred.reject(err.name + ' : ' + err.message);
    if (user) deferred.resolve(user);else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

var countUsers = function countUsers() {
  var deferred = _q2.default.defer();

  _dbConnection.users.count({}, function (err, count) {
    if (err) deferred.reject(err.name + ' : ' + err.message);
    if (count) deferred.resolve(count);else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

var create = function create(userParam) {
  var deferred = _q2.default.defer();

  var createUser = function createUser() {
    userParam.hash = _bcryptjs2.default.hashSync(userParam.password, 10);

    if (!userParam.admin) userParam.admin = false;

    var newUser = new _dbConnection.users({
      email: userParam.email,
      hash: userParam.hash,
      admin: userParam.admin,
      created_at: new Date(),
      updated_at: new Date() });

    newUser.save(function (err) {
      if (err) deferred.reject(err.name + ' : ' + err.message);else deferred.resolve('Successful user creation.');
    });
  };

  _dbConnection.users.findOne({ email: userParam.email }, function (err, user) {
    if (user) deferred.reject('E-mail ' + userParam.email + ' is already taken.');
    if (err) deferred.reject(err.name + ' : ' + err.message + ': ' + err);else createUser();
  });

  return deferred.promise;
};

var update = function update(_id, userParam) {
  var deferred = _q2.default.defer();

  userParam.updated_at = new Date();

  if (userParam.password) userParam.hash = _bcryptjs2.default.hashSync(userParam.password, 10);

  _dbConnection.users.findByIdAndUpdate(_id, userParam, function (err) {
    if (err) deferred.reject(err.name + ' : ' + err.message);else deferred.resolve('User has been updated.');
  });

  return deferred.promise;
};

var _delete = function _delete(_id) {
  var deferred = _q2.default.defer();

  _dbConnection.users.findByIdAndRemove(_id, function (err) {
    if (err) deferred.reject(err.name + ' : ' + err.message);else deferred.resolve('User has been deleted.');
  });

  return deferred.promise;
};

service.auth = auth;
service.list = list;
service.count = countUsers;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

exports.default = service;
//# sourceMappingURL=users.service.js.map
