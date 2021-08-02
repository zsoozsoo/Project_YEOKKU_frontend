<template>
  <div id="detail">
    <BookList name="book"></BookList>
    <router-link to="/book/BookDetail"></router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import BookList from "../components/culture/BookList.vue";
// import MovieDetail from "../components/culture/MovieDetail.vue";
export default {
  components: { BookList },
  name: "Book",
  computed: {},
};
</script>

<style>
#detail {
  width: 100vw;
  height: 100vh;
}
</style>
