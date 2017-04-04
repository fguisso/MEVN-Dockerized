'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  admin: { type: Boolean, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true } });

module.exports = _mongoose2.default.model('User', userSchema, 'users');
//# sourceMappingURL=users.model.js.map
