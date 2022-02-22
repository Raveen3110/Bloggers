<template>
  <div>
    <!-- <test/> -->
    <blogs />
  </div>
</template>
<script>
import blogs from "./Blogs.vue";

export default {
  name: "Dashboard",
  components: {
    blogs,
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