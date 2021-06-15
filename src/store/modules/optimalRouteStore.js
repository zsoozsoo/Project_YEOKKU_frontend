const optimalRouteStore = {
	namespaced: true,
	state: {
		optimalList: [],
	},
	actions: {},
	getters: {
		GET_OPTIMAL_LIST(state) {
			return state.optimalList;
		},
	},
	mutations: {
		SET_OPTIMAL_LIST(state, data) {
			state.optimalList = data;
		},
	},
};
export default optimalRouteStore;
