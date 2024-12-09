import { createStore } from 'vuex'

export default createStore({
  state: {
    painting: {}
  },
  getters: {
    getPainting: (state) => state.painting
  },
  mutations: {
    setPainting(state,painting){
      state.painting = painting;
    }
  },
  actions: {
    updatePainting(state,painting){
      state.commit('setPainting', painting);
    }
  },
  modules: {
  }
})
