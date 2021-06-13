<template lang="">
	<div>
		<h1>현재까지 선택한 관광지 리스트</h1>
		<div>
			<input type="radio" id="walking" value="도보" v-model="ckMode" />
			<label for="walking">도보</label>
			<input type="radio" id="transit" value="대중교통" v-model="ckMode" />
			<label for="transit">대중교통</label>
			<input type="radio" id="cycling" value="자전거" v-model="ckMode" />
			<label for="cycling">자전거</label>
			<input type="radio" id="driving" value="자동차" v-model="ckMode" />
			<label for="driving">자동차</label>
			<p>대중교통 이용불가할 경우, 자동차를 이용한 경로로 검색됩니다.</p>
		</div>
		<div>
			<input type="radio" id="oneway" value="편도" v-model="ckWay" />
			<label for="oneway">편도</label>
			<input type="radio" id="cycle" value="순환" v-model="ckWay" />
			<label for="cycle">순환</label>
		</div>
		<!-- 시작점, 도착점 선택 -->
		<!-- <div v-if="ckMove == 편도"></div>
		<div v-else></div> -->
		<p v-for="data in GET_CURRENT_SPECIFIC_ROUTE" v-bind:key="data.pointId">
			{{ data.pointName }}
		</p>

		<button v-on:click="mvOptimalMap">최적 경로 찾기</button>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import lodash from 'lodash';
import http from '@/util/http-common.js';

// import http from '@/util/http-common.js';
export default {
	name: 'RouteList',
	data() {
		return {
			ckMode: '자동차',
			ckWay: '',
		};
	},
	computed: {
		...mapGetters('mapStore', ['GET_CURRENT_SPECIFIC_ROUTE']),
	},
	methods: {
		mvOptimalMap: function () {
			let first = this.GET_CURRENT_SPECIFIC_ROUTE[0];
			console.log('맨 첫번재 관광지');
			console.log(first);
			let temp = lodash.cloneDeep(this.GET_CURRENT_SPECIFIC_ROUTE);
			console.log('배열 복사 체크');
			temp.shift();
			console.log(temp);
			console.log('배열 복사 체크2');
			console.log(this.GET_CURRENT_SPECIFIC_ROUTE);

			//경로리스트

			http.post('/optpath_round/' + 'driving', {
				start: first,
				end: first,
				pointList: temp,
			}).then((res) => {
				console.log(res);
			});
			
		},
	},
};
</script>
<style lang=""></style>
