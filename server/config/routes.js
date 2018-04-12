const userController = require('../controller/userController');
const menuController = require('../controller/menuController');
const sujetController = require('../controller/sujetController');
const filiereController = require('../controller/filiereController');
const studentController = require('../controller/studentController');


module.exports = function(app, router) {

router.use(function(req, res, next) {

    next();

});

//______________________________________________________________________________________________
//----------------------------------User API----------------------------------------------------
//______________________________________________________________________________________________

router.route('/users/checkuser').post(function(req, res) { userController.checkuser(req, res);})
router.route('/users/:id*?')
    .post(function(req, res) {userController.create(req, res);})
    .get((req, res) => {userController.index(req, res);})
    .put(function(req, res) {userController.put(req, res);})
    .delete(function(req, res) { userController.delete(req, res); });

//______________________________________________________________________________________________
//----------------------------------Menu API----------------------------------------------------
//______________________________________________________________________________________________

    router.route('/menu/:id*?')
        .get((req, res) => { menuController.index(req, res);})
        .post((req, res) => {menuController.add(req, res);});

//______________________________________________________________________________________________
//----------------------------------Sujets API----------------------------------------------------
//______________________________________________________________________________________________


    router.route('/sujets/:id*?')
        .post(function(req, res) {sujetController.create(req, res)}) 
        .get((req, res) => {sujetController.index(req, res)})
        .put(function(req, res) {sujetController.put(req, res)})
        .delete(function(req, res) {sujetController.delete(req, res)});
    
    router.route('/sujet/:id*')
        .get((req, res)=>{ sujetController.getSujet(req, res) });

    router.route('/sujetbyf/:id*')
        .get((req, res)=>{ sujetController.getSujetByFiliere(req, res) });

//______________________________________________________________________________________________
//----------------------------------Student API----------------------------------------------------
//______________________________________________________________________________________________

    router.route('/students/:id*?')
        .post(function(req, res) {studentController.create(req, res)})
        .get((req, res) => {studentController.index(req, res)})
        .put(function(req, res) {studentController.put(req, res)})
        .delete(function(req, res) {studentController.delete(req, res)});

    router.route('/student/:id*')
        .get((req, res)=>{ studentController.getStudent(req, res) });

//______________________________________________________________________________________________
//----------------------------------Professor API----------------------------------------------------
//______________________________________________________________________________________________



//______________________________________________________________________________________________
//----------------------------------Filiere API----------------------------------------------------
//______________________________________________________________________________________________

router.route('/filiere/:id*?')
.get((req, res) => {filiereController.index(req, res)})
.post((req, res) => {filiereController.create(req, res)})


//______________________________________________________________________________________________
//----------------------------------Projet API----------------------------------------------------
//______________________________________________________________________________________________


}

