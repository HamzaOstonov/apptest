<template>
  <v-app-bar app clipped-left :key="componentKey" v-if="activate">
    <span>Toolbar</span>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn v-if="!loggedIn" to="/register" exact> Ruyxatdan utish</v-btn>
    <v-btn v-if="!loggedIn" to="/login" exact> Kirish</v-btn>
    <v-btn v-if="loggedIn" v-on:click="logout()" exact> Chiqish</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Toolbar",
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader",
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify",
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify",
      },
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com",
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com",
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify",
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs",
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
      },
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer",
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined",
      },
      {
        text: "Frequently Asked Questions",
        href:
          "https://vuetifyjs.com/getting-started/frequently-asked-questions",
      },
    ],
    activate: true
  }),
  created () {
    if (this.$route.path === '/login') {
      this.activate = false
    } else {
      this.activate = true
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    componentKey() {
      return this.$store.state.signReLoadMenu;
    },
  },
  watch: {
    '$route.path' (val) {
      if (val === '/login') {
        this.activate = false
      } else {
        this.activate = true
      }
    }
  },
  methods: {
    logout() {
      //this.loggedin = false;
      this.$store.commit("destroyToken");
      this.$store.commit("forceReLoadMenu");
      sessionStorage.removeItem('jwt');
    },
  },
};
</script>
