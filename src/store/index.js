import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mapStore from '@/store/modules/mapStore.js';

const store = new Vuex.Store({
	modules: {
		mapStore: mapStore,
	},
});

export default store;
