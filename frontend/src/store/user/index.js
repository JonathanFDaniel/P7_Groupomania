import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default {
    namespaced: true,
    state: {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
    },
    mutations: {
        SET_STATE(state, userInfo) {
            Object.assign(state, {
              id: userInfo.id,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
              email: userInfo.email,
            });
        }
    },
    actions: {
        setUser({ commit }, { payload }) {
            const userInfo  = payload;
            commit("SET_STATE", userInfo);
        },
        setEmptyUser({ commit }) {
            commit("SET_STATE", {
              id: "",
              firstname: "",
              lastname: "",
              email: "",
            });
        }
    },
    getters: {
        user: state => {
            return state;
        },
        getUserMail: state => {
            return state.email;
        }
    }
};