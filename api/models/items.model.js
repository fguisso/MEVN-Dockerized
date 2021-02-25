const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: { type: String, required: true },
  solicitante: { type: String, required: true },
  status: { type: String, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true } })

module.exports = mongoose.model('Item', itemSchema, 'items')
