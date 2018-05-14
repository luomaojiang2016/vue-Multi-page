import Vue from 'vue';
import Vuex from 'vuex';
import Store from './modules/store';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        Store
    }
});
export default store;
