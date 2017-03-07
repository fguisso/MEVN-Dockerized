import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Q from 'q';
import { users as Users } from '../models/db-connection';

const service = {};

const secret = process.env.SECRET;

const auth = (username, password) => {
  const deferred = Q.defer();

  Users.findOne({ username }, { hash: 1, admin: 1 }, (err, user) => {
    bcrypt.compare(password, user.hash)
    .then((res) => {
      if (user && res) deferred.resolve({ token: jwt.sign({ sub: user._id }, secret), isAdmin: user.admin });
      if (!res) deferred.reject('Password incorrect!');
      else deferred.resolve('Nothing to show here!');
    })
    .catch(e => deferred.reject(`${e.name} : ${e.message}`));
    if (err) deferred.reject(`${err.name} : ${err.message}`);
  });

  return deferred.promise;
};

const list = () => {
  const deferred = Q.defer();

  Users.find({}, (err, users) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    if (users) deferred.resolve(users);
    else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

const countUsers = () => {
  const deferred = Q.defer();

  Users.count({}, (err, count) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    if (count) deferred.resolve(count);
    else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

const create = (userParam) => {
  const deferred = Q.defer();

  const createUser = () => {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);

    if (!userParam.admin) userParam.admin = false;

    const newUser = new Users({
      username: userParam.username,
      hash: userParam.hash,
      admin: userParam.admin,
      created_at: new Date(),
      updated_at: new Date() });

    newUser.save((err) => {
      if (err) deferred.reject(`${err.name} : ${err.message}`);
      else deferred.resolve('Successful user creation.');
    });
  };

  Users.findOne({ username: userParam.username }, (err, user) => {
    if (user) deferred.reject(`Username ${userParam.username} is already taken.`);
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else createUser();
  });

  return deferred.promise;
};

const update = (_id, userParam) => {
  const deferred = Q.defer();

  userParam.updated_at = new Date();

  if (userParam.password) userParam.hash = bcrypt.hashSync(userParam.password, 10);

  Users.findByIdAndUpdate(_id, userParam, (err) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve('User has been updated.');
  });

  return deferred.promise;
};

const _delete = (_id) => {
  const deferred = Q.defer();

  Users.findByIdAndRemove(_id, (err) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve('User has been deleted.');
  });

  return deferred.promise;
};

service.auth = auth;
service.list = list;
service.count = countUsers;
service.create = create;
service.update = update;
service.delete = _delete;

export default service;
