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
      jokes: [],
      favorites: [],
      timer: false,
      timerEnabled: true
    };
  },
  methods: {
    async deleteFavoriteJoke(jokeId) {
      this.loading = true;
      try {
        await axios.delete(`/api/v1/jokes/delete-favorite-joke/${jokeId}`);

        this.$notify({
          group: "notify",
          text: "Joke deleted successfully!",
          position: "top right",
          type: "success"
        });
        this.getFavoriteJokes();
      } catch (error) {
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
    async setJokeFavorite(joke) {
      if (this.favorites.length === 10) {
        this.$notify({
          group: "notify",
          text: "You have already 10 favorites set.",
          position: "top right",
          type: "error"
        });
        return;
      }
      try {
        await axios.post("/api/v1/jokes/set-favorite-joke", joke);

        this.$notify({
          group: "notify",
          text: "Joke set as favorite successfully!",
          position: "top right",
          type: "success"
        });

        this.jokes = this.jokes.filter(function(item) {
          return item.id !== joke.id;
        });
        this.getFavoriteJokes();
      } catch (error) {
        this.$notify({
          group: "notify",
          text: error.response.data.err || error.message,
          position: "top right",
          type: "error"
        });
      }
    },
    async getFavoriteJokes(joke) {
      this.loading = true;
      try {
        const response = await axios.get(
          "/api/v1/jokes/get-favorite-jokes",
          joke
        );
        this.favorites = response.data.jokes;
      } catch (error) {
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
    logout() {
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);

      this.$router.push({
        name: "Login"
      });
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
    this.time = setInterval(() => {
      if (this.timerEnabled && this.jokes.length < 10) {
        this.getSingleJoke();
      }
    }, 5000);
  }
};
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="yellow">
            <v-toolbar-title class="black--text">Jokes</v-toolbar-title>

            <v-spacer></v-spacer>

            <div>
              <v-switch hide-details v-model="timerEnabled" label="5 sec. auto-load" />
            </div>
            <v-btn @click="logout()" icon>
              <v-icon>mdi-logout</v-icon>
            </v-btn>
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

          <div class="list">
            <div class="joke" v-for="(item, index) in favorites" :key="item.id">
              <div class="jokeInner pr-4">
                <p class="pt-4 pl-4 pr-4">{{item.joke}}</p>
                <v-icon @click="deleteFavoriteJoke(item.jokeId)" class="pointer" color="red">delete</v-icon>
              </div>
              <v-divider v-if="index + 1 < favorites.length" :key="index + 'a'" />
            </div>
          </div>
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
