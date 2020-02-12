<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
// import { complexPassword } from "../helpers/complexPassword";
// import axios from "axios";

export default {
  name: "Login",
  components: {
    // HelloWorld
  },
  mixins: [validationMixin],
  data() {
    return {
      username: ""
    };
  },
  methods: {
    async submit() {}
  },
  validations: {
    username: { required },
    password: {
      required
      // complexPassword
    }
  },
  computed: {},
  created() {}
};
</script>
<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <router-view />
      </v-content>
      <notifications group="notify" />
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
