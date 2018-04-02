import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
Vue.use(Router)
import router from './routes'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.css'
import Vuex from 'vuex'


Vue.use(Vuetify) 
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menu: {},
    logged: (!(JSON.parse(localStorage.getItem('user'))))?true:false
  
  },
  mutations: {
    setMenu: function(state, u){
      state.menu = u;
    },
    logged(state, l){
      state.logged = l;
    }
    
  },
  getters: {

    getMenu : function(state){
      const auser = JSON.parse(localStorage.getItem('user'));
            
        if(!auser) {
            state.logged = false;
            return [   
                {icon:"home", title:"principale", link:"/" },
                {icon:"person", title:"Connexion", link:"/login" }
            ]
        }else{
            state.logged = true;
            return auser.menu;
        }
    },
    getLogged(state){
      return state.logged;
    }

  }
})

new Vue({

  el: '#app',
  store : store,
  router,
  
  render: h => h(App)

})


