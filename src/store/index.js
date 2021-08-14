import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    playerName: null,
  },

  getters: {
    getPlayerName(state) {
      return state.playerName;
    },
  },

  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setPlayerName(state, playerName) {
      state.playerName = playerName;
    },
  },
  actions: {
  },
  modules: {
  },
});
