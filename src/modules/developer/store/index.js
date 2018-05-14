import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import Store from './modules/store';
const store = new Vuex.Store({
	modules:{
		Store
	}
});
export default store;
