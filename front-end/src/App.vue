<template>
  <v-app>
    <v-toolbar dark class="blue darken-1" >
      <v-toolbar-side-icon @click.native.stop="sidenav = !sidenav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title> PFEs </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat v-for="item in authUser.menu" :key="item.title" router :to="item.link" >
          <v-icon left>{{ item.icon }}</v-icon> {{ item.title }}
        </v-btn>

        <v-btn v-show="logged" @click="logout" flat>
          <v-icon left >person</v-icon> Deconnexion
        </v-btn>

      </v-toolbar-items>
      
    </v-toolbar>
    <v-navigation-drawer temporary v-model="sidenav" fixed app >
      <v-list dense>

        <v-list-tile v-for="item in authUser.menu" :key="item.title" router :to="item.link" >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>       
    </v-navigation-drawer>
    <v-content>
      <v-container color="white" >
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sidenav: false,
    }
  }, 
  methods:{
    logout: function () {
        localStorage.removeItem('user');
        this.$store.commit('setMenu',[]);
        this.$router.push('/login');
    }

  },
  mounted() {
     
  },
  computed: {
    logged(){
        return this.$store.getters.getLogged;
    },
    authUser(){
        return this.$store.getters.getMenu;
    }
  },

}
</script>