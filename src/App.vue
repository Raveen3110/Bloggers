<template>
  <v-app>
    <v-card
      style="background-color: #333333"
      color="lighten-3"
      flat
      height="100%"
      tile
    >
      <!-- <h1>qwe{{ username }}</h1> -->
      <v-toolbar color="black" height="80px" class="fixed-bar">
        <v-toolbar-title @click="gohome">
          <v-img
            class="logo"
            src="@/assets/Log1.png"
            height="40px"
            width="200px"
          />
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="username"
          @click="dialogValueCreate = true"
          class="btn-style"
        >
          <v-icon size="20">mdi-plus</v-icon>
          Create Post
        </v-btn>
        <v-btn v-if="!username" @click="dialogValue = true" class="btn-style">
          Login / Singup
        </v-btn>

        <!-- Logout Dropdown -->
        <v-menu v-if="username" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="log-out" color="black" dark v-bind="attrs" v-on="on">
              Hi {{ username }} <v-icon color="white">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <div class="text-center menu-items" style="background-color: #808080">
            <v-avatar color="black">gg</v-avatar>
            <p class="my-1 white--text">{{ email }}</p>
            <hr />
            <v-list-item
              @click="logout"
              link
              class="white--text"
              style="justify-content: center"
            >
              Logout
            </v-list-item>
          </div>
          <!-- <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list> -->
        </v-menu>
        <!-- xxxxxxxxxxxxxxxx  -->

        <createpost
          v-bind:dialog="dialogValueCreate"
          v-on:changevalue="valueCreateUpdate($event)"
          ref="postdata"
        />
        <modal
          v-bind:dialog="dialogValue"
          v-on:changevalue="valueUpdate($event)"
          v-on:LogInUsername="UserName($event)"
        />
      </v-toolbar>
      <v-main>
        <router-view />
      </v-main>
    </v-card>
  </v-app>
</template>

<script>
import Createpost from "./components/dialog/createpost.vue";
import modal from "./components/dialog/modal";
import { eventBus } from "./main";

export default {
  // username : localStorage.getItem('name'),

  components: {
    modal,
    Createpost,
  },
  name: "App",
  data() {
    return {
      timeout: 5000,
      dialogValue: false,
      dialogValueCreate: false,
      succcesMessage: [],
      succcesColor: "",
      username: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    };
  },

  mounted() {
    eventBus.$on("refresh", () => {
      this.CheckedLogIn();
    });
    eventBus.$on("openDialogBox", (t, d) => {
      this.dialogBox(t, d);
    });
  },

  methods: {
    dialogBox(title, desc) {
      this.dialogValueCreate = true;
      this.$refs.postdata.CreatePost.bodypost = desc;
      this.$refs.postdata.CreatePost.title = title;
      this.$refs.postdata.CreatePost.id = this.$route.params.id;
    },
    gohome() {
      this.$router.push({ name: "Home" });
    },
    CheckedLogIn() {
      this.username = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
    },
    valueUpdate(e) {
      this.dialogValue = e;
    },
    UserName(e) {
      this.username = e;
    },
    valueCreateUpdate(e) {
      this.dialogValueCreate = e;
    },
    logout() {
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("access");
      this.username = localStorage.getItem("name");
      eventBus.$emit("refresh");
    },
  },
};
</script>
<style scoped>

.fixed-bar {
  position: sticky;
  position: -webkit-sticky; /* for Safari */
  top: 0;
  z-index: 2;
}
.btn-style {
  color: white !important;
  background-color: #808080 !important;
  font-size: 12px;
  /* font-weight: 800; */
}
.menu-items {
  padding: 10px;
}
.log-out {
  margin-right: 23px;
}
@media screen and (min-width: 600px) {
  .logo {
    margin-left: 40px !important ;
    cursor: pointer;
  }
  .btn-style {
    margin-right: 40px;
    /* font-weight: 800; */
  }
}

@media screen and (max-width: 600px) {
  .logo {
    padding-left: 0px !important;
    height: 30px !important;
    width: 150px !important;
    cursor: pointer;
  }
  .btn-style {
    color: white !important;
    background-color: #808080 !important;
    font-size: 8px;
    /* font-weight: 800; */
    margin-right: -2% !important;
  }
}
</style>