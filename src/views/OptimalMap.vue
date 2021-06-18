<template>
	<div id="detail" class="d-flex">
		<div class="row mx-auto">
			<div class="col mx-auto row">
				<Map name="map" class="col-7"></Map>
				<div class="col-5 mx-auto">
					<router-link to="/map/spotdetail"></router-link>
					<router-link to="/map/pathdetail"></router-link>
					<router-link to="/map/optlist"></router-link>
					<router-link to="/map/route"></router-link>
					<router-view></router-view>
				</div>
			</div>
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
