import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
  },
  modules: {
  },
});
