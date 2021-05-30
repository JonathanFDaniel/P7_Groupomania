import Vue from "vue";
import Vuex from "vuex";
import Persistedstate from "vuex-persistedstate";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user
    },
    state: {},
    mutations: {},
    actions: {},
    plugins: [Persistedstate()]
});