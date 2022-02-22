<template>
  <div>
    <v-dialog persistent v-model="dialog" width="600">
      <v-card>
        <v-card-title class="black white--text pt-4">
          <span v-if="signIn == false">Login</span>
          <span v-else>
            <v-icon
              @click="signIn = !signIn"
              class="mb-1"
              color="white"
              size="25"
            >
              mdi-arrow-left</v-icon
            >
            Signup
          </span>
          <v-spacer />
          <v-icon @click="modalclosed" color="white" size="25">
            mdi-window-close</v-icon
          >
        </v-card-title>

        <!------------- Login Form Start--------------->

        <v-form
          @submit.prevent="onSubmitLogIn"
          ref="formreset"
          v-if="signIn == false"
        >
          <div class="p-4" style="padding: 35px; background-color: #808080">
            <!-- <div > -->
            <div v-if="LogIn.error.length">
              <!-- on UI -->
              <span style="color: red; font-size: 16px"
                >Please check the following errors</span
              >
          
              <ul>
                <li
                  style="color: red; font-size: 14px"
                  v-for="e in LogIn.error"
                  :key="e.id"
                >
                  {{ e }}
                </li>
              </ul>
              <!-- on UI end -->
            </div>

            <!-- </div> -->
            <label class="white--text">Email</label>
            <v-text-field
              :disabled="signupLoader"
              placeholder="E.g. abc@xyz.com"
              class="bold white--text"
              v-model="LogIn.email"
              background-color="white"
              required
              outlined
              clearable
              dense
              solo
            />
            <label class="white--text">Password</label>

            <v-text-field
              :disabled="signupLoader"
              class="bold white--text"
              :type="!showPassword ? 'password' : 'text'"
              v-model="LogIn.password"
              background-color="white"
              outlined
              required
              dense
              solo
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
            <span @click="signIn = !signIn" class="sing-up">
              Not a member? Signup here
              <v-icon style="margin-left: -4px" color="white" size="18">
                mdi-arrow-right</v-icon
              >
            </span>
          </div>
          <v-card-actions class="footer flex">
            <v-btn
              small
              class="btn-style white--text"
              type="submit"
              elevation="8"
            >
              Login
              <v-progress-circular
                v-if="signupLoader"
                indeterminate
                color="white"
                size="10"
                width="2"
              />
            </v-btn>
          </v-card-actions>
        </v-form>
        <!------------- Login Form End--------------->

        <!------------- SignUp Form Start--------------->

        <v-form @submit.prevent="onSubmitSignIn" ref="formreset" v-else>
          <div class="p-4" style="padding: 35px; background-color: #808080">
            <div v-if="Register.errors.length">
              <!-- on UI -->
              <span style="color: red; font-size: 16px"
                >Please check the following errors</span
              >
            
              <ul>
                <li
                  style="color: red; font-size: 14px"
                  v-for="e in Register.errors"
                  :key="e.id"
                >
                  {{ e }}
                </li>
              </ul>
              <!-- on UI end -->
            </div>
            <label class="white--text">Name</label>
            <v-text-field
              :disabled="signupLoader"
              class="bold white--text"
              v-model="SignUp.username"
              placeholder="E.g. Neha Kumari"
              background-color="white"
              :rules="nameRules"
              required
              outlined
              clearable
              dense
              solo
            />

            <label class="white--text">Email</label>
            <v-text-field
              :disabled="signupLoader"
              :type="email"
              class="bold white--text"
              v-model="SignUp.email"
              placeholder="E.g. abc@xyz.com"
              background-color="white"
              :rules="emailRules"
              required
              outlined
              clearable
              dense
              solo
            />

            <label class="white--text">Password</label>
            <v-text-field
              :disabled="signupLoader"
              class="bold white--text"
              v-model="SignUp.password"
              background-color="white"
              outlined
              :type="!showPassword2 ? 'password' : 'text'"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword2 = !showPassword2"
              required
              dense
              solo
            />

            <div class="white--text">Confirm Password</div>
            <v-text-field
              :disabled="signupLoader"
              class="bold white--text"
              background-color="white"
              v-model="SignUp.confirmPassword"
              :type="!showPassword3 ? 'password' : 'text'"
              :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword3 = !showPassword3"
              outlined
              required
              dense
              solo
            />
          </div>
          <v-card-actions class="footer flex">
            <v-btn
              small
              class="btn-style white--text"
              type="submit"
              elevation="8"
            >
              Signup
              <v-progress-circular
                v-if="signupLoader"
                indeterminate
                color="white"
                size="10"
                width="2"
              />
            </v-btn>
          </v-card-actions>
        </v-form>
        <!------------- SignIn Form End--------------->
      </v-card>
    
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import API_BASE from "../../config/api";
import { eventBus } from '../../main';
Vue.use(VueAxios, axios);

export default {
  name: "modal",
  props: {
    dialog: Boolean,
  },
  methods: {
    onSubmitSignIn() {
      const body = {
        email: this.SignUp.email,
        name: this.SignUp.username,
        password: this.SignUp.password,
        password_2: this.SignUp.confirmPassword,
      };
      this.Register.errors = [];
      if (!this.SignUp.username) {
        // this.Register.errors.push(Name);
      }
      if (!this.SignUp.email) {
        this.Register.errors.push("Email is Required");
      }
      if (!this.SignUp.password) {
        this.Register.errors.push("Password is Required");
      }
      if (!this.SignUp.confirmPassword) {
        this.Register.errors.push("Confirm Password is Required");
      }
      if (this.SignUp.confirmPassword != this.SignUp.password) {
        this.Register.errors.push("Password is not same!");
      }
      if (
        this.SignUp.email &&
        this.SignUp.username &&
        this.SignUp.password &&
        this.SignUp.confirmPassword
      ) {
        this.signupLoader = true;

        Vue.axios
          .post(API_BASE + "authentication/register/", body)
          .then((response) => {
            console.log("succes::::::::::", response);
            this.signupLoader = false;

            localStorage.setItem("access", response.data.token.access);
            localStorage.setItem("name", response.data.name);
            // this.LogInUsername=response.data.name
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("id", response.data.id);
            this.$refs.formreset.reset();
            eventBus.$emit('refresh')
            // this.$root.$refs.appvue.calling();
            this.modalclosed();
            // this.$router.go("|");
          })
          .catch((error) => {
            console.log("Error:::::::::::::", error);
            this.signupLoader = false;
          });
      }
    },

    onSubmitLogIn() {
      (this.LogIn.error = []), console.log("Login Dataa", this.LogIn.email);
      console.log("Login Dataa", this.LogIn.password);

      const body = {
        email: this.LogIn.email,
        password: this.LogIn.password,
      };
      if (this.LogIn.email && this.LogIn.password) {
        // console.log("No Error and APIs Call here");
        this.signupLoader = true;
        Vue.axios
          .post(API_BASE + "authentication/validate/", body)
          .then((response) => {
            console.log("succes", response.data);
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("name", response.data.name);
            // this.LogInUsername=response.data.name
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("id", response.data.id);
            this.signupLoader = false;
            this.$refs.formreset.reset();
            this.modalclosed();
            eventBus.$emit('refresh')
          })
          .catch((error) => {
            console.log("Error:::::::::::::", error.response.data.detail);
            this.Apierrormessage = error.response.data.detail;
            this.signupLoader = false;
          });
      }

      if (!this.LogIn.email) {
        console.log("Email is req");
        this.LogIn.error.push("Email is required");
      }
      if (!this.LogIn.password) {
        console.log("Password is req");
        this.LogIn.error.push("Password is required");
      }
    },
    modalclosed() {
      this.$refs.formreset.reset();
      // this.$emit("LogInUsername",LogInUsername)
      this.$emit("changevalue", false);
      this.signIn = false;
    },
  },
  data() {
    return {
      signIn: false,
      showPassword: false,
      showPassword2: false,
      showPassword3: false,
      signupLoader: false,
      Apierrormessage: null,
      succcesColor: "",
      // LogInUsername:null,
      firstname: "",
      nameRules: [
        (v) => !!v || "Name is required",
        // (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],

      succcesMessage: [],
      error: [],

      SignUp: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      LogIn: {
        error: [],
        email: null,
        password: null,
      },
      Register: {
        errors: [],
        name: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
    };
  },
};
</script>
<style scoped>
.sing-up {
  /* font-weight: bold; */
  cursor: pointer;
  font-size: 13px;
  color: white;
}
/* background-color: #808080 !important; */
.btn-style {
  padding: 10px !important;
  color: white !important;
  background-color: #808080 !important;
  font-size: 10px !important;
  margin-right: 23px !important;
  font-weight: 800;
}
.footer {
  justify-content: flex-end;
  background-color: black;
  padding: 10px;
}
.v-card__actions > .v-btn.v-btn {
  padding: 18px 24px !important;
}
</style>