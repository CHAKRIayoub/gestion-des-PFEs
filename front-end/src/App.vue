<template>
  <v-app>
    <v-dialog v-model="chargement" ></v-dialog>
    <v-toolbar dark class="blue darken-1" >
      <v-toolbar-side-icon @click.native.stop="sidenav = !sidenav" class="hidden-sm-and-up">
        <v-icon>fas fa-bars</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title> PFEs </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">

        <v-btn flat v-for="item in menus" :key="item.title" router :to="item.link" >
          <v-icon left>{{ item.icon }}</v-icon> {{ item.title }}
        </v-btn>

        <v-btn v-show="logged"  @click="logout" flat>
          <v-icon left >fas fa-sign-out-alt</v-icon> Deconnexion
        </v-btn>

         <v-btn v-show="!logged"  to="/login" flat>
          <v-icon left >fas fa-sign-in-alt</v-icon> Connexion
        </v-btn>

      </v-toolbar-items>
      
    </v-toolbar>
    <v-navigation-drawer temporary v-model="sidenav" fixed app >
      <v-list dense>

        <v-list-tile v-for="item in menus" :key="item.title" :to="item.link" >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/login"  v-show="!logged"  >
          <v-list-tile-action>
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Connexion
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout"  v-show="logged"  >
          <v-list-tile-action>
            <v-icon>fas fa-sign-out-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Deconnexion
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
      chargement:true,
      sidenav: false,
      menu:[]
    }
  }, 
  methods:{
    logout: function () {
        
        this.$store.commit('logout');
        this.$router.push('/login');
    }
  },
  mounted() {

    this.chargement = false
     
  },
  computed: {

    logged(){
        return this.$store.getters.logged;
    },

    menus(){
        return this.$store.getters.menu;
    },

    authUser(){
        return JSON.parse(localStorage.getItem('user'))
    }

  },

}
</script>