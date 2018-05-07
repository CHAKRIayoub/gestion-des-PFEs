
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


/*___________________________________________________________                                                               |
|************************************************************| 
|*                                                          *|         
|*                     Importer les composants              *|      
|*                                                          *|
|************************************************************|        
*/

//-----------------------------------------------------------------
//general compo----------------------------------------------------
import home from '../components/home'
import login from '../components/auth/login'


//-----------------------------------------------------------------
//student compo----------------------------------------------------
import student from '../components/stud/home'

    //choisir un sujet_____________________________________________
    import studSujetIndex from '../components/stud/sujet/choixSujet'

    //consultation resultat________________________________________
    
    //suivi________________________________________________________
    import studSuiviIndex from '../components/stud/suivi/suiviSujet'


//-----------------------------------------------------------------
//professor compo--------------------------------------------------
import professor from '../components/prof/home'

    //gestion des sujets___________________________________________
    import profSujetIndex from '../components/prof/sujet/indexSujet'
    import addSujet from '../components/prof/sujet/addSujet'
    import editSujet from '../components/prof/sujet/editSujet'



    //validation des sujets_________________________________________
    import showSujet from '../components/prof/sujet/showSujet'
    import attrSujet from '../components/prof/sujet/attrSujet'

    //suivi d'etat__________________________________________________
    import indexSuivi from '../components/prof/suivi/indexSuivi'
    import suiviSujet from '../components/prof/suivi/suiviSujet'
    



/*___________________________________________________________                                                               |
|************************************************************| 
|*                                                          *|         
|*                  initialiser les routes                  *|      
|*                                                          *|
|************************************************************|        
*/


export default new Router({
  routes: [

//-----------------------------------------------------------------
//general compo----------------------------------------------------

    {path: '/home',      name: 'home', component: home},

    {path: '/login', name: 'login',component: login,
        beforeEnter: (to, from, next) => {
            if(! localStorage.getItem('logged')=="false") {
              next('/');
            }else next();
        }
    },

//-----------------------------------------------------------------
//student compo----------------------------------------------------

    {path: '/student/home', name: 'student', component: student,
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if((user.role == "professor")) {
            next('/professor')
            }else next();
        }
    },
    
    //choisir un sujet_____________________________________________

    {path: '/student/sujets', name: 'choixSujets', component: studSujetIndex},

    //consultation resultat________________________________________
    //suivi________________________________________________________

    
    {path: '/student/resultat', name: 'studSuiviIndex', component: studSuiviIndex},


//-----------------------------------------------------------------
//professor compo--------------------------------------------------

    {path: '/professor/home', name: 'professor', component: professor,
        beforeEnter: (to, from, next) => {
            const user = JSON.parse(localStorage.getItem('user'));
            if((user.role == "etudiant")) {
            next('/')
            }else next();
        }
    },
        
    //gestion des sujets___________________________________________

        {path: '/sujets', name: 'profSujetIndex', component: profSujetIndex},
        {path: '/sujets/add/', name: 'addSujet', component: addSujet},
        {path: '/sujets/edit/:idSujet', name: 'editSujet', component: editSujet},


    //validation des sujets________________________________________

        {path: '/sujets/show/:idSujet', name: 'showSujet', component: showSujet},
        {path: '/sujets/attr/:idSujet', name: 'attrSujet', component: attrSujet},

    //suivi d'etat_________________________________________________

        {path: '/prof/suivi', name: 'indexSuivi', component: indexSuivi},
        {path: '/sujets/suivi/:idSujet', name: 'suiviSujet', component: suiviSujet},


   
    
    
    

   

   
  ],
  mode: 'history'
})