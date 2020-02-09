<template>
  <div id="app">
    <v-app id="inspire">
      <router-view />
      <notifications group="notify" />
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
