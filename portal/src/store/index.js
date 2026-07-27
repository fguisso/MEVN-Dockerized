import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
  },
  getters: {
    getUser: (state) => state.user,
  },
});
