import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import mapStore from '@/store/modules/mapStore.js';
import optimalRouteStore from '@/store/modules/optimalRouteStore.js';

const store = new Vuex.Store({
	modules: {
		mapStore: mapStore,
		optimalRouteStore: optimalRouteStore,
	},
});

export default store;
