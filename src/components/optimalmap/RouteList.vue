<template lang="">
	<div>
		<h1>현재까지 선택한 관광지 리스트</h1>
		<div>
			<input type="radio" id="walking" value="walking" v-model="ckMode" />
			<label for="walking">도보</label>
			<input type="radio" id="transit" value="transit" v-model="ckMode" />
			<label for="transit">대중교통</label>
			<input type="radio" id="bicycling" value="bicycling" v-model="ckMode" />
			<label for="bicycling">자전거</label>
			<input type="radio" id="driving" value="driving" v-model="ckMode" />
			<label for="driving">자동차</label>
			<p>대중교통 이용불가할 경우, 자동차를 이용한 경로로 검색됩니다.</p>
		</div>
		<div>
			<input type="radio" id="oneway" value="oneway" v-model="ckWay" />
			<label for="oneway">편도</label>
			<input type="radio" id="round" value="round" v-model="ckWay" />
			<label for="round">순환</label>
		</div>
		<!-- 시작점, 도착점 선택 -->
		<div>
			<i v-if="ckWay == 'round'">시작점 및 도착점</i>
			<i v-if="ckWay == 'oneway'">시작점</i>

			<draggable tag="ul" :list="GET_CURRENT_ROUTE">
				<li
					v-for="(data, index) in GET_CURRENT_ROUTE"
					v-bind:key="data.pointId"
				>
					<i>목록이미지</i>
					<span>{{ data.pointName }}</span>
					<i @click="removeAt(index)">삭제이미지</i>
				</li>
			</draggable>
			<!-- <i v-if="GET_CURRENT_ROUTE.length > 1 && ckWay == 'oneway'">도착점</i> -->
		</div>

		<button v-on:click="mvOptimalMap">최적 경로 찾기</button>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import lodash from 'lodash';
import http from '@/util/http-common.js';
import Draggable from 'vuedraggable';

export default {
	name: 'RouteList',
	components: {
		Draggable,
	},
	data() {
		return {
			ckMode: 'driving',
			ckWay: 'oneway',
		};
	},
	computed: {
		...mapGetters('mapStore', ['GET_CURRENT_ROUTE', 'GET_CURCOUNTRY']),
	},
	methods: {
		...mapMutations('mapStore', ['DELETE_A_TOUR']),
		...mapMutations('optimalRouteStore', ['SET_OPTIMAL_LIST']),

		removeAt(idx) {
			this.DELETE_A_TOUR(idx);
		},

		mvOptimalMap: function () {
			if (this.GET_CURRENT_ROUTE.length < 3) {
				alert('최소 3개 이상 관광지를 추가해주세요!');
			} else {
				let temp = lodash.cloneDeep(this.GET_CURRENT_ROUTE);
				let start = temp[0];
				let end = '';
				temp.shift();
				// if (this.ckWay == 'oneway') {
				// 	end = temp[temp.length - 1];
				// 	temp.pop();
				// } else {
				end = start;
				// }

				http
					.post('/path/' + this.ckWay + '/' + this.ckMode, {
						start: start,
						end: end,
						pointList: temp,
						countryName: this.GET_CURCOUNTRY,
					})
					.then((res) => {
						console.log('roundpath');
						const data = {
							way: this.ckWay,
							mode: this.ckMode,
							data: res.data,
						};
						console.log(data);
						this.SET_OPTIMAL_LIST(data);
						this.$router.push('/map/optlist');
					});
			}
		},
	},
};
</script>
<style lang=""></style>
