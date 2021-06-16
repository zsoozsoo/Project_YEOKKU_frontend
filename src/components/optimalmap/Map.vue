<template>
	<div>
		<div id="selectArea">
			<select
				name="continent"
				id="continent"
				ref="continent"
				@change="selectContinent($event)"
			>
				<option>선택</option>
				<option v-for="option in continentOptions" :key="option.continentName">
					{{ option.continentName }}
				</option>
			</select>
			<select
				name="country"
				id="country"
				ref="country"
				@change="selectCountry($event)"
			>
				<option
					v-for="option in countryOptions"
					:key="option.countryCode"
					:continentvalue="option"
				>
					{{ option.countryName }}
				</option>
			</select>
			<select
				name="city"
				id="city"
				ref="city"
				v-model="selected"
				@change="selectCity()"
			>
				<option value="0">선택</option>

				<option
					v-for="option in cityOptions"
					:key="option.cityName"
					:value="{
						centerlat: option.centerLat,
						centerlng: option.centerLng,
						cityName: option.cityName,
					}"
					:continentvalue="option.cityName"
				>
					{{ option.cityName }}
				</option>
			</select>
		</div>

		<div id="map"></div>
	</div>
</template>

<script>
import http from '@/util/http-common.js';
import { mapMutations, mapGetters } from 'vuex';
export default {
	name: 'Map',
	data() {
		return {
			map: null,
			mapCenter: { lat: 37.773972, lng: -122.431297 },
			continentOptions: [],
			countryOptions: [],
			cityOptions: [],
			curmarkers: [],
			markers: [],
			msg: '서비스를 준비중입니다.',
			isAvailservice: true,
			beforeCoutry: '',
			selected: '선택',
			optMarkers: [],
			optLines: [],
			lat: '',
			lng: '',
		};
	},
	created() {
		http
			.get('select/continent')
			.then(({ data }) => {
				this.continentOptions = data;
			})
			.catch((err) => {
				console.dir(err);
			});
	},
	mounted() {
		console.log('map 생성');
		this.initMap();
		console.log('map 생성 후');
	},
	computed: {
		...mapGetters('mapStore', ['GET_ISDUPLICATECITY']),
		...mapGetters('optimalRouteStore', ['GET_POLYLINE', 'GET_MARKERS']),
	},
	watch: {
		$route(to) {
			console.log('route변경 이거 맞았으면 좋겠다');
			console.log(this.lat);
			console.log(this.lng);
			let moveLatLng = new window.google.maps.LatLng(
				parseFloat(this.lat),
				parseFloat(this.lng)
			);
			this.map.panTo(moveLatLng);
			console.log(to.name);
			if (to.name == 'PathDetail') {
				console.log('특정데이터');
				console.log(this.GET_MARKERS);
				console.log('전체데이터');
				console.log(this.markers);

				this.setAllmarker(this.GET_MARKERS);
				this.deleteMarker(this.markers);
				this.map.setZoom(13);
				this.makePolyline(this.GET_POLYLINE);
			} else {
				this.deleteMarker(this.optMarkers);
				console.log(this.curmarkers);
				this.map.setZoom(10);
				this.curmarkers.forEach((value) => {
					this.setMarker({ lat: value.lat, lng: value.lng }, value);
				});
				this.optLines.forEach((value) => {
					value.setMap(null);
				});
			}
		},
	},
	methods: {
		...mapMutations('mapStore', [
			'SET_SPECIFIC_SPOT',
			'CHANGE_TOUR_LIST',
			'SET_CUR_COUNTRY',
		]),

		makePolyline(data) {
			console.log('polydata');
			console.log(data);
			for (const poly of data) {
				let decode = new window.google.maps.geometry.encoding.decodePath(poly);
				let line = new window.google.maps.Polyline({
					path: decode,
					strokeColor: '#1835D0',
					strokeOpacity: 1.0,
					strokeWeight: 4,
					zIndex: 3,
				});
				this.optLines.push(line);
				line.setMap(this.map);
			}
		},

		initMap() {
			this.map = new window.google.maps.Map(document.getElementById('map'), {
				center: this.mapCenter,
				zoom: 10,
			});
		},

		setAllmarker(data) {
			data.forEach((value) => {
				this.setMarker2(
					{ lat: parseFloat(value.lat), lng: parseFloat(value.lng) },
					value
				);
			});
		},

		setMarker2(Points, value) {
			let marker = new window.google.maps.Marker({
				position: Points,
				map: this.map,
				// animation: window.google.maps.Animation.DROP,
				title: value.pointName,
			});
			this.optMarkers.push(marker);
		},
		setMarker(Points, value) {
			let marker = new window.google.maps.Marker({
				position: Points,
				map: this.map,
				title: value.pointName,
				// animation: window.google.maps.Animation.DROP,
				// label: {
				//   text: Label,
				//   color: "#000",
				// },
			});
			marker.addListener('click', () => {
				this.SET_SPECIFIC_SPOT(value);
				this.$router.push('/map/spotdetail');
			});
			this.markers.push(marker);
		},

		deleteMarker(marker) {
			for (const data of marker) {
				data.setMap(null);
			}
			this.markers = [];
		},

		checkalreadyVisit(country) {
			this.CHANGE_TOUR_LIST(country);
			if (this.GET_ISDUPLICATECITY == true) {
				this.$router.push('/map/route');
			}
		},
		selectContinent(event) {
			//데이터 변경될 때,
			let continent = event.target.value;

			http
				.get('select/country/' + continent)
				.then(({ data }) => {
					this.countryOptions = data;
				})
				.catch((err) => {
					console.dir(err);
				});
		},

		selectCountry(event) {
			//데이터 변경될 때,
			let country = event.target.value;
			this.SET_CUR_COUNTRY(country);
			if (this.beforeCoutry.length == 0) {
				this.beforeCoutry = country;
			} else {
				let data = {
					beforeCnt: this.beforeCoutry,
					curCnt: country,
				};
				this.checkalreadyVisit(data);
			}
			this.beforeCoutry = country;
			http
				.get('select/city/' + country)
				.then(({ data }) => {
					this.cityOptions = data;
					if (this.cityOptions.length == 0) {
						this.isAvailservice = false;
						alert(this.msg);
					}
				})
				.catch((err) => {
					console.dir(err);
				});
		},

		selectCity() {
			let lat = this.selected.centerlat;
			let lng = this.selected.centerlng;
			this.lat = lat;
			this.lng = lng;
			let city = this.selected.cityName;
			let moveLatLng = new window.google.maps.LatLng(lat, lng);
			http
				.get('select/point/' + city)
				.then(({ data }) => {
					if (this.markers.length > 0) {
						this.deleteMarker(this.markers);
					}
					this.map.panTo(moveLatLng);
					this.curmarkers = data;
					if (this.curmarkers.length == 0) {
						alert('서비스 제공예정지역입니다!');
					}
					this.curmarkers.forEach((value) => {
						this.setMarker({ lat: value.lat, lng: value.lng }, value);
					});
				})
				.catch((err) => {
					console.dir(err);
				});
		},
	},
};
</script>

<style>
#map {
	width: 50vw;
	height: 50vh;
}
</style>
