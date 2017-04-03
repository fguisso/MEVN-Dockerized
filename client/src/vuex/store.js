import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      name: '',
      isAdmin: '',
      avatarUrl: '',
    },
  },
  mutations: {
    SET_USER_INFOS(store, obj) {
      /* eslint-disable no-param-reassign */
      store.user = obj.user;
    },
  },
});
