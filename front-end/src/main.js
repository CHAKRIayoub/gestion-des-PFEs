import Vue from 'vue'

import Router from 'vue-router' 
Vue.use(Router)
import router from './routes'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify) 

import Vuex from 'vuex'
Vue.use(Vuex)
import store from './stores/store.js'

import App from './App.vue'

new Vue({

  el: '#app',
  store : store,
  router,
  
  render: h => h(App)

})


