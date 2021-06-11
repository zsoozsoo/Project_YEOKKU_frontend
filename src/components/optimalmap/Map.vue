<template>
  <div>
    <div id="selectArea">
      <select  name="continent" id="continent" ref="continent" @change="selectContinent($event)">
          <option>선택</option>
          <option v-for="option in continentOptions" :key="option.continentName" :continentvalue="option.continentName">
              {{option.continentName}}</option>

      </select>
      <select name="country" id="country" ref="country" @change="selectCountry($event)">
        <option value="0">선택</option>
         <option v-for="option in countryOptions" :key="option.countryCode" :continentvalue="option.countryName" :centerlat="option.c">
              {{option.countryName}}</option>
      </select>
      <select name="city" id="city" ref="city" @change="selectCity($event)">
        <option value="0">선택</option>
        <option v-for="option in cityOptions" :key="option.cityName" :continentvalue="option.cityName">
              {{option.cityName}}</option>
      </select>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import http from "@/util/http-common.js";
export default {
  name: "Map",
  data() {
    return {
      map: null,
      mapCenter: { lat: 37.773972, lng: -122.431297 },
      continentOptions : [],
      countryOptions : [],
      cityOptions : [],
      markers : [],
      msg : "서비스를 준비중입니다.",
      isAvailservice : true,
    };
  },
  created() {
      http
        .get("select/continent")
        .then(({data}) => {
            this.continentOptions = data;
            console.log(this.continentOptions);
        })
        .catch((err) => {
            console.dir(err);
        });
  },
  mounted() {
    console.log("map 생성");
    this.initMap();
    console.log("map 생성 후");
    this.setMarker(this.mapCenter, "test");
  },
  computed: {},
  methods: {
    initMap() {
      this.map = new window.google.maps.Map(document.getElementById("map"), {
        center: this.mapCenter,
        zoom: 17,
      });
    },

    setMarker(Points, Label) {
      new window.google.maps.Marker({
        position: Points,
        map: this.map,
        label: {
          text: Label,
          color: "#000",
        },
      });
    },

    selectContinent(event){
        let continent = event.target.value;
        http
        .get("select/country/" + continent)
        .then(({data}) => {
            this.countryOptions = data;
        })
        .catch((err) => {
            console.dir(err);
        });

    },

    selectCountry(event){
        let country = event.target.value;
        http
        .get("select/city/" + country)
         .then(({data}) => {
            this.cityOptions = data;
            console.log(this.cityOptions);
            if(this.cityOptions.length == 0){
                this.isAvailservice = false;
                alert(this.msg);
            }
            this.map.panTo()
        })
        .catch((err) => {
            console.dir(err);
        });
    },

    selectCity(event){
        let city = event.target.value;
        http
        .get("select/point/" + city)
        .then(({data}) => {
            console.log(data);
            this.markers = data;
            this.markers.forEach((value) => {
                this.setMarker({lat : value.lat, lng : value.lng}, value.pointName);
            });
        })
        .catch((err) => {
            console.dir(err);
        });

    }
  },
};
</script>

<style>
#map {
  width: 80vw;
  height: 100vh;
}
</style>
