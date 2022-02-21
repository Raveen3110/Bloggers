<template>
  <div>
    Hello this is a demo file
    <table>
      <tr>
        <td>Head1</td>
        <td>Head3</td>
        <td>Head5</td>
      </tr>
      <tr v-for="item in Apidata" :key="item.id">
          <td>{{item.title}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

export default {
  name: "test",
  data() {
    return {
      Apidata: [],
    };
  },
  mounted() {
    Vue.axios.get("https://jsonplaceholder.typicode.com/posts").then((resp) => {
      this.Apidata = resp.data;
      console.log("Data", resp.data);
    });
  },
};
</script>