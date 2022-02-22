<template>
  <div>
    <div v-if="loader">
      <v-img
        class="loading"
        src="@/assets/load.gif"
        height="70px"
        width="70px"
      />
    </div>
    <v-card
      v-for="item in blogDataShrink"
      :key="item.id"
      class="blogs grey darken-1 white--text"
    >
      <h2 class="contain-head">{{ item.title }}</h2>
      <div v-html="item.description.substring(0, 200) + `...`"></div>
      <!-- <div class="blog-contain">
        {{ item.description.substring(0, 400) }}...{{ " " }}
      </div> -->
      <v-btn
        small
        color="grey darken-4"
        class="white--text"
        @click="seeDetails(item.id)"
        >See More</v-btn
      >
      <div class="blog-contain">
        Posted by : {{ item.posted_by_details.name }}
      </div>
    </v-card>
  </div>
</template>
<script>
// import blogsData from "../../json/MOCK_DATA";
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import API_BASE from "../../config/api";
import { eventBus } from "../../main";
Vue.use(VueAxios, axios);

export default {
  name: "Blogs",
  data() {
    return {
      blogsData: [],
      blogsDetails: [],
      blogDataShrink: [],
      loader: false,
    };
  },

  // created() {
  //   this.Blogs();
  // },

  mounted() {
    this.Blogs();
    eventBus.$on("refreshList", () => {
      this.Blogs();
    });
  },

  // computed: {
  //   blogsData1() {
  //     const blogsData1 = this.blogDataShrink.map((post) => {
  //       if (post.description && post.description.length > 50)
  //         post.description = post.description.substring(0, 50) + "...";
  //       console.log("asdcf", post);
  //       return post;
  //     });

  //     return blogsData1;
  //   },
  // },
  methods: {
    Blogs() {
      this.loader = true;
      Vue.axios
        .get(API_BASE + "/blogs/?page=1")
        .then((response) => {
          this.blogDataShrink = response.data.results;
          // this.blogsData = response.data.results;

          this.loader = false;
        })
        .catch((error) => {
          console.log("Error:::::::::::::", error);
          this.loader = false;
        });
    },
    seeDetails(id) {
      this.$router.push({ name: "BlogsDetails", params: { id: id } });
    },
  },
};
</script>
<style scoped>
.loading {
  margin: auto !important;
}
/* Desktop screen */
@media screen and (min-width: 600px) {
  .blogs {
    padding: 20px;
    margin-left: 60px;
    margin-right: 60px;
    margin-top: 25px;
  }
  .contain-head {
    font-size: 20px;
  }
  .blog-contain {
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 10px;
  }
}
/* Mobile Screen */
@media screen and (max-width: 600px) {
  .blogs {
    padding: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .contain-head {
    font-size: 14px;
  }
  .blog-contain {
    font-size: 12px;
    margin-top: 2px;
  }
}
</style>