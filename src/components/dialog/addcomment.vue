<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="900">
      <v-card>
        <v-card-title class="black white--text pt-4">
          <h4>Add Comment</h4>
          <v-spacer />
          <v-icon @click="modalclosed" color="white" size="25">
            mdi-window-close</v-icon
          >
        </v-card-title>
        <v-card-text class="create-inner">
          <v-form @submit.prevent="addcomment">
            <div class="inner-part">
              <label class="white--text">Comments</label>
              <vue-editor
                style="background-color: white; color: black; width: 100%"
                v-model="CreatePost.bodypost"
              ></vue-editor>
            </div>
            <v-card-actions class="footer flex">
              <div v-if="CreatePost.id == null">
                <v-btn
                  small
                  class="btn-style white--text"
                  elevation="8"
                  type="submit"
                >
                  <v-icon size="12">mdi-plus</v-icon>
                  Add
                  <v-progress-circular
                    v-if="Loader"
                    indeterminate
                    color="white"
                    size="10"
                    width="2"
                  />
                </v-btn>
              </div>

              <div v-else>
                <v-btn
                  small
                  class="btn-style white--text"
                  elevation="8"
                  type="submit"
                >
                  Update Comment
                  <v-progress-circular
                    v-if="Loader"
                    indeterminate
                    color="white"
                    size="10"
                    width="2"
                  />
                </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import API_BASE from "../../config/api";
import { VueEditor } from "vue2-editor";
import { eventBus } from "../../main";
Vue.use(VueAxios, axios);

export default {
  name: "addcomment",
  props: {
    dialog: Boolean,
  },
  components: { VueEditor },

  data() {
    return {
      CreatePost: {
        bodypost: "",
        token: localStorage.getItem("access"),
        id: null,
      },
      Loader: false,
    };
  },

  methods: {
    modalclosed() {
      // setTimeout(() => {
        this.CreatePost.bodypost = "";
        this.CreatePost.id = null;
      // }, 100);
      this.$emit("changevalue", false);
    },

    addcomment() {
      const body = {
        description: this.CreatePost.bodypost,
      };
      if (!this.CreatePost.id) {
       
       this.Loader = true;
        Vue.axios
          .post(
            API_BASE + "blogs/" + this.$route.params.id + "/comments/",
            body,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
              },
            }
          )
          .then(() => {
            // console.log("succes", response.data);
            this.Loader = false;
            eventBus.$emit("refreshCommentList");
            this.modalclosed();
          })
          .catch((error) => {
            console.log("Error:::::::::::::", error.response.data.detail);
            this.Loader = false;
          });
      }
      // Editing Commentss
      else {
        this.Loader = true;
        Vue.axios
          .put(API_BASE + "blogs/comment/" + this.CreatePost.id + "/", body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then((response) => {
            console.log("succes", response.data);
            this.Loader = false;
            this.modalclosed();
            eventBus.$emit("refreshCommentList");

          })
          .catch((error) => {
            console.log("Error:::::::::::::", error);
            this.Loader = false;
          });
      }
    },
  },
};
</script>
<style scoped>
.btn-style {
  padding: 17px !important;
  color: white !important;
  background-color: #808080 !important;
  font-size: 10px !important;
  font-weight: 800;
  margin-right: 10px !important;
}
.footer {
  justify-content: flex-end;
  background-color: black;
  padding: 15px !important;
}
.create-inner {
  background-color: #808080;
  /* padding: 40px !important; */
}
.note {
  font-size: 12px;
  color: white;
  font-weight: bold;
}
.inner-part {
  padding: 25px;
}
.v-dialog > .v-card > .v-card__text {
  padding: 0px !important;
}
</style>