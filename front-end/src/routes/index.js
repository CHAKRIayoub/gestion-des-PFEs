
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '../components/home'
import student from '../components/student'
import professor from '../components/professor'
import login from '../components/auth/login'

export default new Router({
  routes: [
    {
        path: '/',
        name: 'home',
        component: home,

    },
    
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