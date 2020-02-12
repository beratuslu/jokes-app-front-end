<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Jokes",
  components: {
    // HelloWorld
  },
  data() {
    return {
      jokes: [
        {
          id: 1,
          joke:
            "When Chuck Norris plays Oregon Trail, his family does not die from cholera or dysentery, but rather, roundhouse kicks to the face. He also requires no wagon, since he carries the oxen, axels, and buffalo meat on his back. He always makes it to Oregon before you."
        }
      ],
      items2: [
        {
          action: "15 min",
          headline: "Brunch this weekend?",
          title: "Ali Connors",
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        }
      ]
    };
  },
  methods: {
    async setJokeFavorite(joke) {
      this.loading = true;
      try {
        const response = await axios.post(
          "/api/v1/jokes/set-favorite-joke",
          joke
        );
        console.log("TCL: setJokeFavorite -> response", response);

        this.$notify({
          group: "notify",
          text: "Joke set as favorite successfully!",
          position: "top right",
          type: "success"
        });
        //this.getFavorites()
      } catch (error) {
        console.log("hata var: ", error.response);

        this.$notify({
          group: "notify",
          text: error.response.data.err || error.message,
          position: "top right",
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    async getFavoriteJokes(joke) {
      this.loading = true;
      try {
        const response = await axios.get(
          "/api/v1/jokes/get-favorite-jokes",
          joke
        );
        console.log("TCL: setJokeFavorite -> response", response);

        // this.$notify({
        //   group: "notify",
        //   text: "Joke set as favorite successfully!",
        //   position: "top right",
        //   type: "success"
        // });
        //this.getFavorites()
      } catch (error) {
        console.log("hata var: ", error.response);

        this.$notify({
          group: "notify",
          text: error.response.data.err || error.message,
          position: "top right",
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    async getSingleJoke() {
      this.loading = true;
      try {
        const response = await axios.get("/api/v1/jokes/single-random-joke");
        this.jokes.push(response.data);
      } catch (error) {
        this.$notify({
          group: "notify",
          text: error.response.data.err,
          position: "top right",
          type: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    next() {
      console.log("click");
    }
  },

  created() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`
      };
    } else {
      this.$router.push({
        name: "Login"
      });
    }
    this.getFavoriteJokes();
    this.getSingleJoke();
  }
};
</script>
<template>
  <v-container fluid fill-height>
    <v-row align="start" justify="center">
      <v-col md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="yellow" dark>
            <v-toolbar-title>
              <span class="black--text">Jokes</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <div class="list">
            <div class="joke" v-for="(item, index) in jokes" :key="item.id">
              <div class="jokeInner pr-4">
                <p class="pt-4 pl-4 pr-4">{{item.joke}}</p>
                <v-icon @click="setJokeFavorite(item)" class="pointer" color="yellow">star</v-icon>
              </div>
              <v-divider v-if="index + 1 < jokes.length" :key="index + 'a'" />
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="deep-purple" dark>
            <v-toolbar-title>Favorites</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <!-- <v-list two-line>
            <v-list-item-group>
              <template v-for="(item, index) in items2">
                <v-list-item :key="item.title">
                  <template v-slot:default="{}">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                      <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>
                      <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon color="yellow">star</v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider v-if="index + 1 < items2.length" :key="index"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.jokeInner {
  display: flex;
  justify-content: space-between;
}
.v-list-item__icon {
  cursor: pointer !important;
}
</style>
