'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../services/users.service');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var init = function init(req, res) {
  var userParam = {
    email: 'Admin@admin.com',
    password: 'admin',
    admin: true };

  _users2.default.create(userParam).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var authUser = function authUser(req, res) {
  _users2.default.auth(req.body.email, req.body.password).then(function (obj) {
    if (obj.token) res.status(200).send({ token: obj.token, isAdmin: obj.isAdmin });else res.status(401);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var list = function list(req, res) {
  _users2.default.list().then(function (users) {
    return res.status(200).json(users);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var getById = function getById(req, res) {
  _users2.default.getById(req.params._id).then(function (users) {
    return res.status(200).json(users);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var registerUser = function registerUser(req, res) {
  _users2.default.create(req.body).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var updateUser = function updateUser(req, res) {
  _users2.default.update(req.params._id, req.body).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var deleteUser = function deleteUser(req, res) {
  _users2.default.delete(req.params._id).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

router.get('/init', init);
router.get('/list', list);
router.get('/:_id', getById);
router.post('/auth', authUser);
router.post('/register', registerUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

module.exports = router;
//# sourceMappingURL=users.controller.js.map
