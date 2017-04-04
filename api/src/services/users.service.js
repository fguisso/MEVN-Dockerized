import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Q from 'q';
import { users as Users } from '../models/db-connection';

const service = {};

const secret = process.env.SECRET;

const auth = (email, password) => {
  const deferred = Q.defer();

  const authenticate = () => {
    Users.findOne({ email }, { created_at: 0, updated_at: 0 }, (err, user) => {
      bcrypt.compare(password, user.hash)
      .then((res) => {
        if (user && res) {
          deferred.resolve({
            token: jwt.sign({ sub: user._id }, secret),
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.admin });
        }
        if (!res) deferred.reject('Password incorrect!');
        else deferred.resolve('Nothing to show here!');
      })
      .catch(e => deferred.reject(`${e.name} : ${e.message}`));
      if (err) deferred.reject(`${err.name} : ${err.message}`);
    });
  };

  Users.findOne({ email }, (err, user) => {
    if (err) deferred.reject(`${err.name} : ${err.message}: ${err}`);
    if (!user) deferred.reject(`E-mail ${email} not exist.`);
    else authenticate();
  });

  return deferred.promise;
};

const list = () => {
  const deferred = Q.defer();

  Users.find({}, { hash: 0, email: 0, avatar: 0 }, (err, users) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    if (users) deferred.resolve(users);
    else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

const getById = (_id) => {
  const deferred = Q.defer();

  Users.findById(_id, { hash: 0, email: 0, avatar: 0 }, (err, user) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    if (user) deferred.resolve(user);
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

    const avatarRandom = () => {
      const ghIds = [342215, 5755568, 499550];
      const randNum = Math.floor((Math.random() * 3));
      return `https://avatars0.githubusercontent.com/u/${ghIds[randNum]}?v=3&s=32`;
    };

    const newUser = new Users({
      name: userParam.name,
      email: userParam.email,
      hash: userParam.hash,
      admin: userParam.admin,
      avatar: avatarRandom(),
      created_at: new Date(),
      updated_at: new Date() });

    newUser.save((err) => {
      if (err) deferred.reject(`${err.name} : ${err.message}`);
      else deferred.resolve('Successful user creation.');
    });
  };

  Users.findOne({ email: userParam.email }, (err, user) => {
    if (user) deferred.reject(`E-mail ${userParam.email} is already taken.`);
    if (err) deferred.reject(`${err.name} : ${err.message}: ${err}`);
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
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

export default service;
