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
    </div>

    <div id="movieList">
      <ul>
        <li
          v-for="movie in movieList"
          :key="movie.movieID"
          v-on:click="movieDetail(movie.movieID)"
        >
          영화제목:{{ movie.movieTitle }} 개봉년도:{{ movie.prodYear }} 장르 :
          {{ movie.genre }}

          <button>스크랩하기</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common.js";
import { mapActions } from "vuex";
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
    };
  },
  created() {
    http
      .get("select/continent")
      .then(({ data }) => {
        this.continentOptions = data;
      })
      .catch((err) => {
        console.dir(err);
      });
  },
  mounted() {},
  computed: {},
  methods: {
    ...mapActions("movieStore", ["SET_MOVIE_ID"]),
    selectContinent(event) {
      //데이터 변경될 때,
      let continent = event.target.value;
      http
        .get("select/country/" + continent)
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
      console.log("pointinfo/movie/" + country);
      http
        .get("pointinfo/movie/" + country)
        .then(({ data }) => {
          this.movieList = data;
          console.log(this.movieList);
          if (this.movieList.length == 0) {
            this.isAvailservice = false;
            alert(this.msg);
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    movieDetail: function (mid) {
      // console.log(mid);
      this.SET_MOVIE_ID(mid);
      this.$router.push("/movie/moviedetail");
    },
  },
};
</script>

<style>
#movieList {
  width: 50vw;
  height: 50vh;
}
</style>
