<template>
  <v-navigation-drawer clipped permanent app :key = "componentKey">
    <v-list>
      <div v-for="(link, i) in links" :key="i">
        <v-list-item v-if="boshMenu(link) === '1'" :to="link.to">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="link.text" />
        </v-list-item>

        <v-list-group
          v-else-if="boshMenu(link) === '2'"
          :key="link.text"
          no-action
        >
          <!--  -->
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ link.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item
            v-for="sublink in even(link.subLinks)"
            :to="sublink.to"
            :key="sublink.text"
          >
            <v-list-item-title v-text="sublink.text" />
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navbar",
  data: () => ({
    links: [
      {
        to: "/test",
        icon: "mdi-view-dashboard",
        text: "Test yechishga utish",
        role: {
          requiresAuth: true,
        },
      },
       {
        to: "/tests",
        icon: "mdi-view-dashboard",
        text: "Test(2) yechishga utish",
        role: {
          requiresAuth: true,
        },
      },
       {
        to: "/admin",
        icon: "mdi-view-dashboard",
        text: "Testlarni kiritish/tahrirlash",
        role: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      /*{
        icon: "mdi-tennis",
        text: "Справочник",
        subLinks: [
          {
            text: "Товарлар",
            to: "/tovar",
            role: {},
          },
          {
            text: "Артикул",
            to: "/artikul",
            role: {
              requiresAuth: true,
            },
          },
          {
            text: "Клиент",
            to: "/client",
            role: {
              requiresAuth: true,
            },
          },
          {
            text: "Ходимлар",
            to: "/user",
            role: {},
          },
        ],
      },
      {
        to: "/tournaments",
        icon: "mdi-trophy",
        text: "Паролни узгартириш",
        role: {},
      },*/
    ],
  }),
  computed: {
    componentKey() {
      return this.$store.state.signReLoadMenu;
    },
     loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    boshMenu(item) {
      if (item.subLinks) {
        for (var i = 0; i < item.subLinks.length; i++) {
          //console.log(item.subLinks[i]);
          if (!item.subLinks[i].role.requiresAuth || this.loggedIn)
            return "2";
        }
        return "0";
      } else {
        if (!item.role.requiresAuth || this.loggedIn)
          return "1";
        else 
          return "0";
      }
    },
    even: function (hamzalar) {
      return hamzalar.filter(function (hamza) {
        if (!hamza.role.requiresAuth || this.loggedIn)
          return true;
        else 
          return false;
      });
    },
  },

  
};
</script>
