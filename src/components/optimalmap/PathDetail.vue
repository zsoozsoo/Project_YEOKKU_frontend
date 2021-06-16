<template>
	<div>
		<p>{{ GET_OPTIMAL_OPTIONS.mode }} {{ GET_OPTIMAL_OPTIONS.way }}</p>

		<div v-if="GET_OPTIMAL_OPTIONS.mode == 'transit'">
			<div
				v-for="(data, index) in GET_OPTIMAL_DETAIL.data"
				v-bind:key="`transitpath${index}`"
			>
				{{ data.startPoint.pointName }} ({{ data.startPoint.address }})
				{{ data.endPoint.pointName }}-> ({{ data.startPoint.address }})
				{{ data.totalDistance }}
				{{ data.totalDuration }}
				<div v-for="(route, index) in data.instuctionList" :key="index">
					{{ route.instruction }}
					{{ route.distance }}
					{{ route.duration }}
				</div>
			</div>
		</div>
		<div v-else>
			<div
				v-for="(data, index) in GET_OPTIMAL_DETAIL.data"
				v-bind:key="`path${index}`"
			>
				{{ data.startPoint.pointName }} ({{ data.startPoint.address }})
				{{ data.endPoint.pointName }}-> ({{ data.startPoint.address }})
				{{ data.totalDistance }}
				{{ data.totalDuration }}
			</div>
		</div>
		<div>
			<button v-on:click="mvOptList">최적경로리스트이동</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'PathDetail',
	data() {
		return {};
	},
	computed: {
		...mapGetters('optimalRouteStore', [
			'GET_OPTIMAL_DETAIL',
			'GET_OPTIMAL_OPTIONS',
		]),
	},
	methods: {
		mvOptList: function () {
			this.$router.push('/map/optlist');
		},
	},
};
</script>

<style></style>
