
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//general compo
import home from '../components/home'
import login from '../components/auth/login'

//student compo
import student from '../components/student'

//professor compo
import professor from '../components/professor'
import profSujetIndex from '../components/prof/sujet/indexSujet'
import addSujetIndex from '../components/prof/sujet/addSujet'

//router
export default new Router({
  routes: [
    {path: '/sujets', name: 'profSujetIndex', component: profSujetIndex},
    {path: '/sujets/add/', name: 'addSujet', component: addSujetIndex},
    {path: '/',name: 'home',component: home},
    
    {
        path: '/login',
        name: 'login',
        component: login,
        beforeEnter: (to, from, next) => {
            if(! localStorage.getItem('logged')=="false") {
              next('/');
            }else next();
        }
    },

    {
        path: '/student',
        name: 'student',
        component: student,
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if((user.role == "professor")) {
              next('/professor')
            }else next();
        }
    },

    {
        path: '/professor',
        name: 'professor',
        component: professor,
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if((user.role == "etudiant")) {
              next('/student')
            }else next();
        }
    },
  ],
  mode: 'history'
})