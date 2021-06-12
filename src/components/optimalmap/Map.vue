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
			selected: '선택',
		};
	},
	created() {
		http
			.get('select/continent')
			.then(({ data }) => {
				this.continentOptions = data;
				console.log(this.continentOptions);
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
	},
	methods: {
		...mapMutations('mapStore', ['SET_SPECIFIC_SPOT', 'CHANGE_TOUR_LIST']),

		initMap() {
			this.map = new window.google.maps.Map(document.getElementById('map'), {
				center: this.mapCenter,
				zoom: 10,
			});
		},

		setMarker(Points, value) {
			let marker = new window.google.maps.Marker({
				position: Points,
				map: this.map,
				animation: window.google.maps.Animation.DROP,
				// label: {
				//   text: Label,
				//   color: "#000",
				// },
			});
			marker.addListener('click', () => {
				this.SET_SPECIFIC_SPOT(value);
				this.$router.push('/map');
				console.log(value);
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
			console.log('선택된 도시');
			console.log(country);

			this.CHANGE_TOUR_LIST(country);
			if (this.GET_ISDUPLICATECITY == true) {
				this.$route.push('/route');
			}
		},
		selectContinent(event) {
			//데이터 변경될 때,
			let continent = event.target.value;
			console.log(continent);
			console.log(event.target.value);
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
			this.checkalreadyVisit(country);
			console.log(country);
			console.log(event);
			http
				.get('select/city/' + country)
				.then(({ data }) => {
					this.cityOptions = data;
					console.log(this.cityOptions);
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
			let city = this.selected.cityName;
			let moveLatLng = new window.google.maps.LatLng(lat, lng);
			http
				.get('select/point/' + city)
				.then(({ data }) => {
					console.log(data);
					console.log(this.markers.length);
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
