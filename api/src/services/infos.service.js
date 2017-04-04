import Q from 'q';
import itemService from '../services/items.service';
import userService from '../services/users.service';

const service = {};

const constructInfo = () => {
  const deferred = Q.defer();
  const infos = {};
  const promises = [
    itemService.count(),
    userService.count(),
    itemService.recents()];

  Q.all(promises)
    .then((result) => {
      infos.itemsCount = result[0];
      infos.userCount = result[1];
      infos.recentes = result[2];
      deferred.resolve(infos);
    })
    .catch(err => deferred.reject(err));

  return deferred.promise;
};

service.infos = constructInfo;

export default service;
