'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _dbConnection = require('../models/db-connection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = {};

var list = function list() {
  var deferred = _q2.default.defer();
  _dbConnection.items.find({}, function (err, items) {
    if (err) deferred.reject(err.name + ' : ' + err.message);
    if (items) deferred.resolve(items);else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

var countItems = function countItems() {
  var deferred = _q2.default.defer();

  _dbConnection.items.count({}, function (err, count) {
    if (err) deferred.reject(err.name + ' : ' + err.message);
    if (count) deferred.resolve(count);else deferred.resolve('Nothing to show here! Wheres my Count?');
  });

  return deferred.promise;
};

var recentItems = function recentItems() {
  var deferred = _q2.default.defer();

  _dbConnection.items.find({}).sort({ created_at: -1 }).limit(5).select({ name: 1, created_at: 1 }).exec(function (err, items) {
    if (err) deferred.reject(err.name + ' : ' + err.message);
    if (items) deferred.resolve(items);else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

var create = function create(itemParam) {
  var deferred = _q2.default.defer();

  var newItem = new _dbConnection.items({
    name: itemParam.name,
    solicitante: itemParam.solicitante,
    status: itemParam.status,
    created_at: new Date(),
    updated_at: new Date() });

  newItem.save(function (err) {
    if (err) deferred.reject(err.name + ' : ' + err.message);else deferred.resolve('Successful item creation.');
  });

  return deferred.promise;
};

var update = function update(_id, itemParam) {
  var deferred = _q2.default.defer();

  itemParam.updated_at = new Date();

  _dbConnection.items.findByIdAndUpdate(_id, itemParam, function (err) {
    if (err) deferred.reject(err.name + ' : ' + err.message);else deferred.resolve('Item has been updated.');
  });

  return deferred.promise;
};

var _delete = function _delete(_id) {
  var deferred = _q2.default.defer();

  _dbConnection.items.findByIdAndRemove(_id, function (err) {
    if (err) deferred.reject(err.name + ' : ' + err.message);else deferred.resolve('Item has been deleted.');
  });

  return deferred.promise;
};

service.list = list;
service.count = countItems;
service.recents = recentItems;
service.create = create;
service.update = update;
service.delete = _delete;

exports.default = service;
//# sourceMappingURL=items.service.js.map
