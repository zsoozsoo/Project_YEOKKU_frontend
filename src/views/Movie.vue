<template>
  <div id="detail">
    <MovieList name="movie"></MovieList>
    <router-link to="/movie/movieDetail"></router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import MovieList from "../components/culture/MovieList.vue";
// import MovieDetail from "../components/culture/MovieDetail.vue";
export default {
  components: { MovieList },
  name: "Movie",
  computed: {},
};
</script>

<style>
#detail {
  width: 100vw;
  height: 100vh;
}
</style>
