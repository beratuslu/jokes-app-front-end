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
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    // HelloWorld
  },

  data: () => ({
    //
  })
};
</script>
