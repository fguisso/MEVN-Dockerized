import Q from 'q';
import { items as Items } from '../models/db-connection';

const service = {};

const list = () => {
  const deferred = Q.defer();
  Items.find({}, (err, items) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    if (items) deferred.resolve(items);
    else deferred.resolve('Nothing to show here!');
  });

  return deferred.promise;
};

const countItems = () => {
  const deferred = Q.defer();

  Items.count({}, (err, count) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    if (count) deferred.resolve(count);
    else deferred.resolve('Nothing to show here! Wheres my Count?');
  });

  return deferred.promise;
};

const recentItems = () => {
  const deferred = Q.defer();

  Items.find({})
    .sort({ created_at: -1 })
    .limit(5)
    .select({ name: 1, created_at: 1 })
    .exec((err, items) => {
      if (err) deferred.reject(`${err.name} : ${err.message}`);
      if (items) deferred.resolve(items);
      else deferred.resolve('Nothing to show here!');
    });

  return deferred.promise;
};

const create = (itemParam) => {
  const deferred = Q.defer();

  const newItem = new Items({
    name: itemParam.name,
    solicitante: itemParam.solicitante,
    status: itemParam.status,
    created_at: new Date(),
    updated_at: new Date() });

  newItem.save((err) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve('Successful item creation.');
  });

  return deferred.promise;
};

const update = (_id, itemParam) => {
  const deferred = Q.defer();

  itemParam.updated_at = new Date();

  Items.findByIdAndUpdate(_id, itemParam, (err) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve('Item has been updated.');
  });

  return deferred.promise;
};

const _delete = (_id) => {
  const deferred = Q.defer();

  Items.findByIdAndRemove(_id, (err) => {
    if (err) deferred.reject(`${err.name} : ${err.message}`);
    else deferred.resolve('Item has been deleted.');
  });

  return deferred.promise;
};

service.list = list;
service.count = countItems;
service.recents = recentItems;
service.create = create;
service.update = update;
service.delete = _delete;

export default service;
