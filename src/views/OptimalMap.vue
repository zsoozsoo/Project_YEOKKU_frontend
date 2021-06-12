<template>
	<div id="detail">
		<Map name="map"></Map>
		<div>
			<router-link to="/spotdetail"></router-link>
			<router-link to="/pathdetail"></router-link>
			<router-link to="/optlist"></router-link>
			<router-link to="/route"></router-link>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
import Map from '../components/optimalmap/Map.vue';

export default {
	components: { Map },
	name: 'OptimalMap',
	computed: {},
};
</script>

<style>
#detail {
	width: 100vw;
	height: 100vh;
}
</style>
