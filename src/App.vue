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
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <router-view />
      </v-content>
      <!-- <notifications group="notify" /> -->
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>
