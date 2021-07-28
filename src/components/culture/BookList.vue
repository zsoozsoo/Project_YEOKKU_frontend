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

    <div id="bookList">
      <ul>
        <li
          v-for="book in bookList"
          :key="book.isbn"
          v-on:click="bookDetail(book)"
        >
          제목 :{{ book.titleInfo }} {{ book.authorInfo }} 출판사 :
          {{ book.pubInfo }} 출판일 : {{ book.expDate }}

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
  name: "BookList",
  data() {
    return {
      continentOptions: [],
      countryOptions: [],
      cityOptions: [],
      beforeCoutry: "",
      selected: "선택",
      bookList: [],
      bookDetailInfo: {},
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
    ...mapActions("bookStore", ["SET_BOOK_ISBN"]),
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
      console.log("pointinfo/book/" + country);
      http
        .get("pointinfo/book/" + country)
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            let title_tmp = data[i].titleInfo + "";
            let title = title_tmp.replace("<b>", "");
            title = title.replace("</b>", "");
            data[i].titleInfo = title;
          }
          this.bookList = data;
          console.log(this.bookList);
          if (this.bookList.length == 0) {
            this.isAvailservice = false;
            alert(this.msg);
          }
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    bookDetail: function (selectedBook) {
      // console.log(mid);
      this.SET_BOOK_ISBN(selectedBook);
      // this.bookDetailInfo = selectedBook;
      // console.log(selectedBook);
      this.$router.push("/book/bookdetail");
    },
  },
};
</script>

<style>
#bookList {
  width: 50vw;
  height: 50vh;
}
</style>
