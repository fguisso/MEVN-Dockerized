'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _items = require('../services/items.service');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var list = function list(req, res) {
  _items2.default.list().then(function (items) {
    return res.status(200).json(items);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var registerItem = function registerItem(req, res) {
  _items2.default.create(req.body).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var updateItem = function updateItem(req, res) {
  _items2.default.update(req.params._id, req.body).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

var deleteItem = function deleteItem(req, res) {
  _items2.default.delete(req.params._id).then(function (msg) {
    return res.status(200).send(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

router.get('/list', list);
router.post('/register', registerItem);
router.put('/:_id', updateItem);
router.delete('/:_id', deleteItem);

module.exports = router;
//# sourceMappingURL=items.controller.js.map
