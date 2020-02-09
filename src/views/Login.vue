<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
// import { complexPassword } from "../helpers/complexPassword";
import axios from "axios";

export default {
  name: "Login",
  components: {
    // HelloWorld
  },
  mixins: [validationMixin],
  data() {
    return {
      username: "",
      password: "",
      loading: false
    };
  },
  methods: {
    async submit() {
      const { password, username } = this;

      let login = {
        password,
        username
      };
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;
        try {
          const response = await axios.post("/login", login);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user);

          this.$router.push({
            name: "Jokes"
          });
        } catch (error) {
          console.log("hata var: ", error.response);

          this.$notify({
            group: "notify",
            text: error.response.data.err,
            position: "top right",
            type: "error"
          });
        } finally {
          this.loading = false;
        }
      }
    }
  },
  validations: {
    username: { required },
    password: {
      required
      // complexPassword
    }
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");

      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      //       !this.$v.password.complexPassword &&
      //         errors.push(`Passwords must, include one increasing straight of at least three letters, like ‘abc’, ‘cde’, ‘fgh’, include at least two non-overlapping pairs of letters, like aa,
      // bb, or cc,  may not include the letters 'i', 'O', or 'l'.`);
      return errors;
    }
  },
  created() {}
};
</script>
<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Username"
                  name="login"
                  prepend-icon="person"
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  :error-messages="usernameErrors"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  placeholder="Password"
                  v-model="password"
                  :error-messages="passwordErrors"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :loading="loading" @click="submit()" color="primary"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
