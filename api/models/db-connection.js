const mongoose = require('mongoose')
const Q = require('q')

mongoose.Promise = Q.Promise

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/mevn'

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>
  console.log('Mongoose default connection open to ', dbUri))

mongoose.connection.on('error', err =>
  console.log('Mongoose default connection error: ', err))

mongoose.connection.on('disconnected', () =>
  console.log('Mongoose default connection disconnected'))

mongoose.connection.on('open', () =>
  console.log('Mongoose default connection is open'))

process.on('SIGINT', () =>
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  }))

const users = require('./users.model.js')
const items = require('./items.model.js')

module.exports = {
  users,
  items }
