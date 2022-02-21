<template>
  <div class="white--text">
    <div class="blog-head">
      Posted By :{{ blogsView.posted_by_details.name }}

      <v-spacer />
      <v-btn
        v-if="blogsId == LogUserId"
        @click="DeletePost"
        class="btn-style delete-btn"
      >
        Delete Post
      </v-btn>
    </div>

    <v-card class="blogs grey darken-1 white--text">
      <div class="contain-head" style="display: flex">
        {{ blogsView.title }}
        <v-spacer />
        <v-icon
         v-if="blogsId == LogUserId"
         @click="EditPost(blogsView.title,blogsView.description)" class="icons" color="white" size="22"
          >mdi-pencil</v-icon
        >
      </div>
      <div v-html="blogsView.description" class="blog-contain"></div>
    </v-card>

    <div class="comments-head">
      Comments :
      <v-spacer />
      <v-btn
        v-if="username"
        @click="dialogValueCreate = true"
        class="btn-style comments-add"
      >
        <v-icon size="20">mdi-plus</v-icon> Add Comments
      </v-btn>
    </div>

    <addcomment
      v-bind:dialog="dialogValueCreate"
      v-on:changevalue="valueCreateUpdate($event)"
      ref="commentsRef"
    />

    <v-card
      v-for="item in CommentsByUser"
      :key="item.id"
      class="comments-blog blogs grey darken-1 white--text"
    >
      <div style="display: flex">
        {{ item.posted_by_details.name }}
        <v-spacer />
        <span v-if="item.posted_by_details.id == LogUserId">
          <v-icon
            @click="EditComment(item.description , item.id)"
            class="icons"
            color="white"
            size="22"
            >mdi-pencil</v-icon
          >
          &nbsp;&nbsp;
         <v-icon
            @click="Deletecomment(item.id)"
            class="icons"
            color="white"
            size="24"
            >mdi-window-close</v-icon
          >
         
        </span>
      </div>

      <div v-html="item.description" class="comments-say"></div>

      <small class="comments-date">
        <i>on </i>{{ new Date(item.created).toLocaleString() }}
      </small>
    </v-card>

    <!-- Footer Start-->
    <v-footer class="mt-6" dark padless>
      <v-card class="flex" flat tile>
        <v-card-text class="py-2 white--text text-center">
          <v-icon class="icons">mdi-linkedin</v-icon> &nbsp;
          <v-icon class="icons">mdi-github</v-icon>

          <br />
          2022 Free Blogger. All Rights Reserved.
        </v-card-text>
      </v-card>
    </v-footer>
    <!-- Footer End-->
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import API_BASE from "../../config/api";
import addcomment from "../dialog/addcomment.vue";
import { eventBus } from "../../main";
Vue.use(VueAxios, axios);

export default {
  components: { addcomment },
  name: "BlogsDetails",
  data() {
    return {
      blogsId: "",
      LogUserId: localStorage.getItem("id"),
      blogsView: [],
      dialogValueCreate: false,
      CheckLog: "",
      CommentsByUser: [],
      username: localStorage.getItem("name"),
      commentData:"",
      token: localStorage.getItem("access"),
    };
  },
  created() {
    this.Details();
    this.Addcomment();

    eventBus.$on("refreshList", () => {
      this.Addcomment();
      this.Details()
    });
    eventBus.$on("refresh", () => {
      this.CheckedLogIn();
      this.CheckedUserID();
      this.getToken();
    });
  },

  methods: {
    CheckedLogIn() {
      this.username = localStorage.getItem("name");
    },
    CheckedUserID() {
      this.LogUserId = localStorage.getItem("id");
    },
    getToken(){
      this.token= localStorage.getItem("access");
    },
    valueCreateUpdate(e) {
      this.dialogValueCreate = e;
    },
    Details() {
      Vue.axios
        .get(API_BASE + "blogs/" + this.$route.params.id)
        .then((response) => {
          // console.log("Blogss Detailsss", response.data.posted_by_details.id);
          this.blogsView = response.data;
          this.blogsId = response.data.posted_by_details.id;
        })
        .catch((error) => {
          console.log("Error:::::::::::::", error);
        });
    },
    Addcomment() {
      Vue.axios
        .get(
          API_BASE + "blogs/" + this.$route.params.id + "/comments/?page=" + 1
        )
        .then((response) => {
          // console.log("Commentssss", response.data.results);
          this.CommentsByUser = response.data.results;
          // eventBus.$emit('refresh')
          this.modalclosed();
        })
        .catch((error) => {
          console.log("Error:::::::::::::", error);
        });
    },
    DeletePost() {
      console.log("Dekete Api")
      Vue.axios
        .delete(API_BASE + "blogs/" + this.$route.params.id, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((response) => {
          console.log("deleteeee:::::", response.status);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log("Error:::::::::::::", error);
        });
    },

    EditPost(title,desc) {
       eventBus.$emit('openDialogBox',title,desc)
       eventBus.$emit('refreshForToken')
       console.log("titlee",title)
       console.log("descriptionn",desc)
     
    },
    Deletecomment(id) {
      Vue.axios
        .delete(API_BASE + "blogs/comment/" + id + "/", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((response) => {
          console.log("deleteeee:::::", response.status);
          eventBus.$emit("refreshList");
        })
        .catch((error) => {
          console.log("Error:::::::::::::", error);
        });
    },
    EditComment(desc,id) {
      console.log("Commentss Description", desc); 
      console.log("Commentss current ", id); 

      this.dialogValueCreate = true;
      this.$refs.commentsRef.CreatePost.bodypost=desc;
      this.$refs.commentsRef.CreatePost.id=id;

      // this.$refs.commentsRef.CreatePost.bodypost=desc;
    },
  },
};
</script>
<style scoped>
.icons {
  cursor: pointer;
  font-size: 30px;
}
.btn-style {
  color: white !important;
  background-color: black !important;
  font-size: 12px;
  margin-right: 45px;
  /* font-weight: 800; */
}
/* Destop screen */
@media screen and (min-width: 600px) {
  .contain-head {
    font-size: 20px;
    font-weight: bold;
  }

  .blog-contain {
    font-size: 16px;
    margin-top: 8px;
  }
  .blogs {
    padding: 20px;
    margin-left: 60px;
    margin-right: 60px;
    margin-top: 25px;
  }
  .blog-head {
    margin-left: 60px;
    padding-top: 25px;
    font-size: 14px;
    display: flex;
  }
  .comments-head {
    margin-top: 15px;
    margin-left: 70px;
    font-weight: bold;
    display: flex;
  }
  /* .comments-blog {
    margin-left: 60px;
    margin-right: 60px;
  } */
  .comments-blog {
    padding: 20px;
    margin-top: 10px;
    margin-left: 70px;
    margin-right: 70px;
  }
  .delete-btn {
    padding: 20px;
    /* margin-top: 10px; */
    margin-left: 70px;
    margin-right: 60px;
  }
  .comments-add {
    padding: 20px;
    /* margin-top: 10px; */
    margin-left: 70px;
    margin-right: 70px;
  }
  .comments-say {
    font-size: 14px;
  }
  .comments-date {
    font-size: 12px;
  }
}
/* Mobile Screen */
@media screen and (max-width: 600px) {
  .contain-head {
    font-size: 14px;
  }
  .blog-contain {
    font-size: 12px;
    margin-top: 2px;
  }
  .blogs {
    padding: 12px;
    /* margin-left: 10px;   */
    /* margin-right: 10px; */
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .blog-head {
    padding-left: 15px;
    padding-top: 25px;
    font-size: 11px;
    display: flex;
  }
  .comments-blog {
    padding: 15px;
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .comments-add {
    /* padding: 15px; */
    /* margin-top: 5px; */
    /* margin-left: 20px; */
    margin-right: 10px;
  }
  .delete-btn {
    /* padding: 15px; */
    /* margin-top: 5px; */
    /* margin-left: 20px; */
    margin-right: 10px;
  }
  .comments-head {
    /* margin-right: 20px; */
    padding-left: 20px;
    display: flex;
    /* font-weight: bold; */
  }
  .comments-say {
    font-size: 12px;
  }
  .comments-date {
    font-size: 10px;
  }
}
</style>