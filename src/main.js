import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import "vuetify/dist/vuetify.min.css";
import axios from "axios";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000";

Vue.use(Notifications);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
