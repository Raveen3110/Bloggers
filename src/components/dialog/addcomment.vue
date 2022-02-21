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
          <v-form @submit.prevent="addcomment" ref="formreset">
            <div class="inner-part">
              <label class="white--text">Comments</label>
              <vue-editor
                style="background-color: white; color: black; width: 100%"
                v-model="CreatePost.bodypost"
              ></vue-editor>
            </div>
            <v-card-actions class="footer flex">
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
  // props:['dialog'],

  components: {
    VueEditor,
  },
  data() {
    return {
      CreatePost: {
        bodypost: "",
        // bodypost:"ertywuidocfvygvdcbnjk",
        token: localStorage.getItem("access"),
      },
      Loader: false,
     
    };
  },
  
  // mounted(){
  //    if(comments){
  //       this.bodypost=comments
  //     }
  // },
  methods: {
    modalclosed() {
      this.$emit("changevalue", false);
      //   this.signIn = false;
    },

    addcomment() {
      console.log("Commentss titlee::::", this.CreatePost.bodypost);
      console.log("tokennnn::::", localStorage.getItem("access"));

      const body = {
        description: this.CreatePost.bodypost,
      };

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
        .then((response) => {
          console.log("succes", response.data);
          this.$refs.formreset.reset();
          this.Loader = false;
          eventBus.$emit("refreshList");
          this.modalclosed()    
        })
        .catch((error) => {
          console.log("Error:::::::::::::", error.response.data.detail);
          this.$refs.formreset.reset();
          this.Loader = false;

        });
      //   this.$refs.formreset.reset();
      //   this.modalclosed();
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