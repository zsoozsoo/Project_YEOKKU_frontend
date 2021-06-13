<template>
	<div>
		<p v-for="data in GET_OPTIMAL_LIST" v-bind:key="data.pointId">
			{{ data }}
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
// import http from '@/util/http-common.js';
export default {
	name: 'OptimalList',
	data() {
		return {};
	},
	computed: {
		...mapGetters('optimalRouteStore', ['GET_OPTIMAL_LIST']),
	},
};
</script>

<style></style>
