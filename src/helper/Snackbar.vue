<template>
  <div class="text-center">
    <!-- <h1>{{SnackbarMessage}}</h1> -->
    <v-snackbar
      v-for="item in SnackbarMessage"
      :key="item"
      v-model="SnackbarHandler"
      :timeout="timeout"
      top
      centered
      color="red"
      elevation="24"
    >
      {{ item }}
      
      <template v-slot:action="{ attrs }">
        <v-icon
          v-bind="attrs"
          @click="SnackbarHandler=false"
          color="white"
          size="22"
        >
          mdi-window-close</v-icon
        >
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "Snackbar",
  props: ["SnackbarMessage", "SnackbarHandler","succcesColor"],

  data: () => ({
    SnackbarHandler: false,
    // text: "My timeout is set to 2000.",
    timeout: 5000,
  }),
};
</script>