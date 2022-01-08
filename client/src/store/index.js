import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import createCache from 'vuex-cache';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    clients: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setClients(state, clients) {
      state.clients = clients;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
    setClients({ commit }, clients) {
      commit('setClients', clients);
    },
  },
  modules: {},
  plugins: [vuexLocal.plugin, createCache()],
});
