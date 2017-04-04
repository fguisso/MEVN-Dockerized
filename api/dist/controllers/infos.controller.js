'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _infos = require('../services/infos.service');

var _infos2 = _interopRequireDefault(_infos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var giveMeInfo = function giveMeInfo(req, res) {
  _infos2.default.infos().then(function (msg) {
    return res.status(200).json(msg);
  }).catch(function (err) {
    return res.status(400).send(err);
  });
};

router.get('/', giveMeInfo);

module.exports = router;
//# sourceMappingURL=infos.controller.js.map
