<template>
  <div>
    <div id="movieDetail">
      <div>
        <img
          v-if="this.GET_DETAIL_MOVIE.imageUrl != null"
          :src="this.GET_DETAIL_MOVIE.imageUrl"
          title="이미지"
        />
        <img
          v-if="this.GET_DETAIL_MOVIE.imageUrl == null"
          src="https://via.placeholder.com/150"
          title="기본이미지"
        />
        <br />
        제목: {{ this.GET_DETAIL_MOVIE.movieTitle }}<br />
        개봉년도: {{ this.GET_DETAIL_MOVIE.prodYear }}<br />
        장르: {{ this.GET_DETAIL_MOVIE.genre }}<br />
        러닝타임: {{ this.GET_DETAIL_MOVIE.runtime }}분 <br />
        등급: {{ this.GET_DETAIL_MOVIE.rating }}<br />
        감독:{{ this.GET_DETAIL_MOVIE.director }}<br />

        출연배우:
        <ul>
          <li
            v-for="actor in this.GET_DETAIL_MOVIE.actors"
            :key="actor.actorId"
          >
            {{ actor }}
          </li>
        </ul>
        줄거리 : {{ this.GET_DETAIL_MOVIE.plot }}<br />
        영화정보 링크 :
        <a :href="this.GET_DETAIL_MOVIE.infoUrl" target="blank">{{
          this.GET_DETAIL_MOVIE.infoUrl
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
// import http from "@/util/http-common.js";
import { mapGetters } from "vuex";
// import { movieID } from "./MovieList.vue";
export default {
  name: "MovieList",
  data() {
    return {
      continentOptions: [],
      countryOptions: [],
      cityOptions: [],
      beforeCoutry: "",
      selected: "선택",
      movieList: [],
      msg: "서비스준비중입니다",
      detailMovie: {},
      mid: "",
    };
  },
  created() {
    console.log("movie detail created.");
    // console.log(this.$router.params.movieID);
  },
  mounted() {
    // this.mid = this.$router.params.movieID;
  },
  computed: {
    ...mapGetters("movieStore", ["GET_DETAIL_MOVIE"]),
  },
  watch: {
    detailMovie: function () {
      console.log("detail component watch");
    },
  },
  methods: {},
  beforeupdate() {},
};
</script>

<style>
#movieList {
  width: 50vw;
  height: 50vh;
}
</style>
