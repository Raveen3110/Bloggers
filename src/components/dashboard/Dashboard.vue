<template>
  <div>
    <!-- <test/> -->
    <snackbar/>
    <blogs />
  </div>
</template>
<script>
import Snackbar from '../../helper/Snackbar.vue';
import blogs from "./Blogs.vue";
// import test from "./api calling test/test.vue";x`

export default {
  name: "Dashboard",
  components: {
    blogs,
    Snackbar,
    // test,
  },
};
</script>
<style scoped>
.btn-style {
  color: white !important;
  background-color: #808080 !important;
  height: 50px !important;
  font-weight: 800;
}
.bold {
  font-weight: bold;
  cursor: pointer;
}
</style>