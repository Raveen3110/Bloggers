<template>
  <div class="text-center">
    <v-dialog persistent v-model="dialog" width="900">
      <v-card>
        <v-card-title class="black white--text pt-4">
          <h4>Create Blog Post</h4>
          <v-spacer />
          <v-icon @click="modalclosed" color="white" size="25">
            mdi-window-close</v-icon
          >
        </v-card-title>
        <v-card-text class="create-inner">
          <v-form @submit.prevent="postSubmit">
            <div class="inner-part">
              <label class="white--text">Title</label>
              <v-text-field
                placeholder="Your title here"
                background-color="white"
                :rules="titleRules"
                required
                v-model="CreatePost.title"
                outlined
                clearable
                dense
              />

              <label class="white--text">Body</label>
              <vue-editor
                style="background-color: white; color: black; width: 100%"
                v-model="CreatePost.bodypost"
              ></vue-editor>

              <span class="note"
                >Note : The body must be at least 50 characters</span
              >
            </div>
            <v-card-actions class="footer flex">
              <div v-if="CreatePost.id == null">
                <v-btn
                  small
                  class="btn-style white--text"
                  elevation="8"
                  type="submit"
                >
                  Submit
                  <v-progress-circular
                    v-if="signupLoader"
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
                  Update
                  <v-progress-circular
                    v-if="signupLoader"
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
  name: "createpost",
  props: {
    dialog: Boolean,
  },

  methods: {
    modalclosed() {
        this.CreatePost.title = "";
        this.CreatePost.bodypost = "";
        this.CreatePost.id = null;
      this.$emit("changevalue", false);
      this.signIn = false;
    },
    postSubmit() {
      const body = {
        title: this.CreatePost.title,
        description: this.CreatePost.bodypost,
      };
      if (
        this.CreatePost.title &&
        this.CreatePost.bodypost &&
        this.CreatePost.id == null
      ) {
        this.signupLoader = true;
        Vue.axios
          .post(API_BASE + "blogs/", body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then(() => {
            this.signupLoader = false;
            this.modalclosed();
            eventBus.$emit("refreshList");
          })
          .catch(() => {
            this.signupLoader = false;
          });
      }
      if (!this.CreatePost.bodypost) {
        console.log("Body is req", this.CreatePost.bodypost);
      }
      if (!this.CreatePost.title) {
        console.log("title is req");
      }

      // Updating APIs
      if (this.CreatePost.id !== null) {
        this.signupLoader = true;
        // console.log("updatinggg idd---", this.CreatePost.id);
        Vue.axios
          .put(API_BASE + "blogs/" + this.CreatePost.id, body, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          })
          .then(() => {
            this.signupLoader = false;
            this.modalclosed();
            eventBus.$emit("refreshDetails");
          })
          .catch(() => {
            // console.log("Error:::::::::::::", error);
            this.signupLoader = false;
          });
      }
    },
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      signupLoader: false,
      CreatePost: {
        title: null,
        bodypost: null,
        id: null,
      },
      titleRules: [
        (v) => !!v || "Title is required",
        // (v) => v.length >= 10 || "Title must be more than 10 characters",
      ],
    };
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