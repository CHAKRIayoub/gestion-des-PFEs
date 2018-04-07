import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({

    state:{

        menu: JSON.parse(localStorage.getItem('menu')) || [],
        user: JSON.parse(localStorage.getItem('user')) || {},
        logged: (localStorage.getItem('logged')=="false")?false:true 

    },

    mutations:{

        setUser(state, user){
            localStorage.setItem('user', JSON.stringify(user) )
            localStorage.setItem('logged', "true" )
            state.user = user
            state.logged = true

        },

        setMenu(state, menu){
            localStorage.setItem('menu',  menu )
            state.menu = JSON.parse(localStorage.getItem('menu'))
        },

        logout(state){

            localStorage.setItem('user', JSON.stringify({}) )
            localStorage.setItem('menu', JSON.stringify([]) )
            localStorage.setItem('logged', "false" )

            state.user = {}
            state.logged = false
            state.menu = []

        }

    },

    getters: {

        menu(state){
            return state.menu;
        },

        logged(state){
            return state.logged;
            // return JSON.parse(localStorage.getItem('menu'));
        }



    }

})