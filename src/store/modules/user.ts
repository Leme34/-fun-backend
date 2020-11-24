import { Module } from "vuex";

const user: Module<any, any> = {
  namespaced: true,
  state: {
    id: 0,
    name: ""
  },
  mutations: {
    updateId(state, id) {
      state.id = id;
    },
    updateName(state, name) {
      state.name = name;
    }
  }
};

export default user;
