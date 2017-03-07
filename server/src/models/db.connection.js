import mongoose from 'mongoose';
import Q from 'q';

mongoose.Promise = Q.Promise;

const dbUri = process.env.DB_URI || 'mongodb://localhost:27017/haoc';

mongoose.connect(dbUri);

mongoose.connection.on('connected', () =>
  console.log('Mongoose default connection open to ', dbUri));

mongoose.connection.on('error', err =>
  console.log('Mongoose default connection error: ', err));

mongoose.connection.on('disconnected', () =>
  console.log('Mongoose default connection disconnected'));

mongoose.connection.on('open', () =>
  console.log('Mongoose default connection is open'));

process.on('SIGINT', () =>
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  }));

const users = require('./users.model.js');
const items = require('./items.model.js');

export {
  users,
  items };
