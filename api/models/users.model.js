const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
  admin: { type: Boolean, required: true },
  avatar: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true } })

module.exports = mongoose.model('User', userSchema, 'users')
