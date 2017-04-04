'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _items = require('../services/items.service');

var _items2 = _interopRequireDefault(_items);

var _users = require('../services/users.service');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var service = {};

var constructInfo = function constructInfo() {
  var deferred = _q2.default.defer();
  var infos = {};
  var promises = [_items2.default.count(), _users2.default.count(), _items2.default.recents()];

  _q2.default.all(promises).then(function (result) {
    infos.itemsCount = result[0];
    infos.userCount = result[1];
    infos.recentes = result[2];
    deferred.resolve(infos);
  }).catch(function (err) {
    return deferred.reject(err);
  });

  return deferred.promise;
};

service.infos = constructInfo;

exports.default = service;
//# sourceMappingURL=infos.service.js.map
