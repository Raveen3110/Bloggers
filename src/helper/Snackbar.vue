<template>
  <div>
    <v-snackbar :value="snackBar.show" :color="snackBar.color" top>
      {{ snackBar.textMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="closeSnackBar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import { eventBus } from '../main';
export default {
  name: "Snackbar",
  data() {
    return {
      snackBar: {
        show: false,
        color: "red",
        timeOut: 5000,
        textMessage: "testing",
      },
      created() {
        eventBus.$on("SuccessLogin", () => {
          this.SuccessLogin();
        });
      },
    };
  },
  //   computed: {
  //     snackBar() {
  //     //   return this.$store.getters["snackBar/GET_SNACKBAR"];
  //     },
  //   },

  methods: {
    closeSnackBar() {
      //   this.$store.commit("snackBar/CLOSE_SNACK_BAR");
      this.snackBar.show = false;
    },
    SuccessLogin(){
        console.log("Snackbarrr")
         this.snackBar={
        show: true,
        color: "green",
        timeOut: 5000,
        textMessage: "Successfull Logged in",
      }
    }
  },
};
</script>
<style>
</style>