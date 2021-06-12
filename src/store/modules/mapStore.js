const mapStore = {
	namespaced: true,
	state: {
		specificSpot: Object,
		routeList: [],
		specificRoute: [],
		isAvailableStoreinRouteList: true,
		isDuplicateCity: false,
	},
	actions: {},
	getters: {
		SPECIFIC_SPOT_DETAIL(state) {
			console.log(state.specificSpot);
			return state.specificSpot;
		},
		GET_ISAVAILABLE_SPOT(state) {
			if (state.isAvailableStoreinRouteList == false) return false;
			else return true;
		},
		GET_CURRENT_SPECIFIC_ROUTE(state) {
			return state.specificRoute;
		},
		GET_ISDUPLICATECITY(state) {
			return state.isDuplicateCity;
		},
	},
	mutations: {
		SET_SPECIFIC_SPOT(state, data) {
			console.log(state.specificSpot);
			state.specificSpot = data;
		},
		SET_ADD_SPOT_IN_ROUTE(state, data) {
			state.isAvailableStoreinRouteList = true;
			console.log('이미 저장된 관광지 데이터 보기 ');
			console.log(state.specificRoute);
			//10개 초과하는 경우 저장 불가
			if (state.specificRoute.length > 10) {
				state.isAvailableStoreinRouteList = false;
			}
			if (state.specificRoute.length > 0 && state.specificRoute.length <= 10) {
				for (const point of state.specificRoute) {
					//이미 루트에 저장된 값이면 저장 불가
					if (point.pointId == data.pointId) {
						state.isAvailableStoreinRouteList = false;
					}
				}
			}
			//조건에 다 만족하는 경우 데이터 추가
			if (state.isAvailableStoreinRouteList == true)
				state.specificRoute.push(data);
		},
		CHANGE_TOUR_LIST(state, payload) {
			console.log(payload);
			state.isDuplicateCity = false;
			for (const route of state.routeList) {
				console.log(route.country);
				if (route.country.trim() == payload.trim()) {
					console.log('여기 들어오나요?');
					state.isDuplicateCity = true;
					state.specificRoute = [];
					state.specificRoute.push(route.list);
				}
			}
			if (state.isDuplicateCity == false) {
				if (state.specificRoute.length > 0) {
					let data = {
						country: payload,
						list: state.specificRoute,
					};
					state.routeList.push(data);
					state.specificRoute = [];
					console.log('여기 돌어옴//?');
					console.log(state.routeList);
					console.log('여기 돌어옴2//?');
					console.log(state.specificRoute);
				}
			}
		},
	},
};

export default mapStore;
