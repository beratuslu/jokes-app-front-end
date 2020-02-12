<script>
// @ is an alias to /src
// import axios from "axios";

export default {
  name: "Login",
  components: {
    // HelloWorld
  },
  data() {
    return {
      selected: [2],
      items: [
        {
          action: "15 min",
          headline: "Brunch this weekend?",
          title: "Ali Connors",
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          action: "2 hr",
          headline: "Summer BBQ",
          title: "me, Scrott, Jennifer",
          subtitle: "Wish I could come, but I'm out of town this weekend."
        },
        {
          action: "6 hr",
          headline: "Oui oui",
          title: "Sandra Adams",
          subtitle: "Do you have Paris recommendations? Have you ever been?"
        },
        {
          action: "12 hr",
          headline: "Birthday gift",
          title: "Trevor Hansen",
          subtitle:
            "Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          action: "18hr",
          headline: "Recipe to try",
          title: "Britta Holt",
          subtitle:
            "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        },
        {
          action: "15 min",
          headline: "Brunch this weekend?",
          title: "Ali Connors",
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          action: "2 hr",
          headline: "Summer BBQ",
          title: "me, Scrott, Jennifer",
          subtitle: "Wish I could come, but I'm out of town this weekend."
        },
        {
          action: "6 hr",
          headline: "Oui oui",
          title: "Sandra Adams",
          subtitle: "Do you have Paris recommendations? Have you ever been?"
        },
        {
          action: "12 hr",
          headline: "Birthday gift",
          title: "Trevor Hansen",
          subtitle:
            "Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          action: "18hr",
          headline: "Recipe to try",
          title: "Britta Holt",
          subtitle:
            "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ],
      items2: [
        {
          action: "15 min",
          headline: "Brunch this weekend?",
          title: "Ali Connors",
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        {
          action: "2 hr",
          headline: "Summer BBQ",
          title: "me, Scrott, Jennifer",
          subtitle: "Wish I could come, but I'm out of town this weekend."
        },
        {
          action: "6 hr",
          headline: "Oui oui",
          title: "Sandra Adams",
          subtitle: "Do you have Paris recommendations? Have you ever been?"
        },
        {
          action: "12 hr",
          headline: "Birthday gift",
          title: "Trevor Hansen",
          subtitle:
            "Have any ideas about what we should get Heidi for her birthday?"
        },
        {
          action: "18hr",
          headline: "Recipe to try",
          title: "Britta Holt",
          subtitle:
            "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
        }
      ]
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      // try {
      //   const response = await axios.post("/login", login);

      //   localStorage.setItem("token", response.data.token);
      //   localStorage.setItem("user", response.data.user);

      //   this.$router.push({
      //     name: "Jokes"
      //   });
      // } catch (error) {
      //   console.log("hata var: ", error.response);

      //   this.$notify({
      //     group: "notify",
      //     text: error.response.data.err,
      //     position: "top right",
      //     type: "error"
      //   });
      // } finally {
      //   this.loading = false;
      // }
    }
  },

  created() {}
};
</script>
<template>
  <v-container fluid fill-height>
    <v-row align="start" justify="center">
      <v-col md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="yellow" dark>
            <v-toolbar-title>
              <span class="black--tex"> Jokes</span></v-toolbar-title
            >

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="pink--text"
            >
              <template v-for="(item, index) in items">
                <v-list-item :key="item.title">
                  <template v-slot:default="{}">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon color="yellow">
                        star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index + 1 < items.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col md="6" xs="12">
        <v-card class="mx-auto">
          <v-toolbar color="deep-purple" dark>
            <v-toolbar-title>Favorites</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list two-line>
            <v-list-item-group
              v-model="selected"
              multiple
              active-class="pink--text"
            >
              <template v-for="(item, index) in items2">
                <v-list-item :key="item.title">
                  <template v-slot:default="{}">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                      ></v-list-item-subtitle>
                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-icon color="yellow">
                        star
                      </v-icon>
                    </v-list-item-action>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index + 1 < items.length"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
