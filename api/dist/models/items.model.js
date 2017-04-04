'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var itemSchema = new Schema({
  name: { type: String, required: true },
  solicitante: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true } });

module.exports = _mongoose2.default.model('Item', itemSchema, 'items');
//# sourceMappingURL=items.model.js.map
