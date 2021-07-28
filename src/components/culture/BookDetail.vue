<template>
  <div>
    <div id="bookDetail">
      <div>
        <img
          v-if="this.GET_DETAIL_BOOK.image_path != null"
          :src="this.GET_DETAIL_BOOK.image_path"
          title="이미지"
        />
        <img
          v-if="this.GET_DETAIL_BOOK.image_path == null"
          src="https://via.placeholder.com/150"
          title="기본이미지"
        />
        <br />
        제목: {{ this.GET_DETAIL_BOOK.titleInfo }}<br />
        {{ this.GET_DETAIL_BOOK.authorInfo }}<br />
        출판사: {{ this.GET_DETAIL_BOOK.pubInfo }}<br />
        출판일: {{ this.GET_DETAIL_BOOK.expDate }} <br />
        소개: {{ this.GET_DETAIL_BOOK.datail_path }}<br />
        가격: {{ this.GET_DETAIL_BOOK.price }} ({{
          this.GET_DETAIL_BOOK.currency_code
        }})<br />
        isbn : {{ this.GET_DETAIL_BOOK.isbn }}
      </div>
    </div>
  </div>
</template>

<script>
// import http from "@/util/http-common.js";
import { mapGetters } from "vuex";
// import { bookList } from "./BookList.vue";
export default {
  name: "BookDetail",
  data() {
    return {
      continentOptions: [],
      countryOptions: [],
      cityOptions: [],
      beforeCoutry: "",
      selected: "선택",
      bookList: [],
      msg: "서비스준비중입니다",
      detailBookInfo: {},
      isbn: "",
    };
  },
  created() {
    console.log("book detail created.");
    // console.log(bookList);
    // console.log(this.$router.params.movieID);
  },
  mounted() {
    // this.mid = this.$router.params.movieID;
  },
  computed: {
    ...mapGetters("bookStore", ["GET_DETAIL_BOOK"]),
  },
  watch: {
    detailBook: function () {
      console.log("detail component watch");
    },
  },
  methods: {},
  beforeupdate() {},
};
</script>

<style>
#bookList {
  width: 50vw;
  height: 50vh;
}
</style>
