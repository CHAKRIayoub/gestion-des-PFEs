import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import student from '../components/student'
import professor from '../components/professor'
import login from '../components/auth/login'


Vue.use(Router)

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
            const authUser = JSON.parse(localStorage.getItem('user'))
            if(authUser) {
              next('/');
            }else next();
        }
    },

    {
        path: '/student',
        name: 'student',
        component: student,
        beforeEnter: (to, from, next) => {
            const authUser = JSON.parse(localStorage.getItem('user'));
            if(!authUser) {
              next({name:'login'})
            }else next();
        }
    },

    {
        path: '/professor',
        name: 'professor',
        component: professor,
        beforeEnter: (to, from, next) => {
            const authUser = JSON.parse(localStorage.getItem('user'));
            if(!authUser) {
              next({name:'login'})
            }else
                next();
        }
    },
  ],
  mode: 'history'
})