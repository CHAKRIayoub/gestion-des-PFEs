const userController        =   require('../controller/userController')         ;
const menuController        =   require('../controller/menuController')         ;
const sujetController       =   require('../controller/sujetController')        ;
const filiereController     =   require('../controller/filiereController')      ;
const studentController     =   require('../controller/studentController')      ;
const choixController       =   require('../controller/choixController')        ;
const soutenanceController  =   require('../controller/SoutenanceController')   ;
const MessageController     =   require('../controller/messageController')   ;
const fileController     =   require('../controller/fileController')   ;


module.exports              =   function(app, router) {

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
router.route('/user/:id*').get(function(req, res) { userController.getUser(req, res);})

//______________________________________________________________________________________________
//----------------------------------Menu API----------------------------------------------------
//______________________________________________________________________________________________

    router.route('/menu/:id*?')
        .get((req, res) => {menuController.index(req, res);})
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

    router.route('/addprojet/:id*?')
        .post(function(req, res) {sujetController.addStudent(req, res)}) 

    router.route('/sujetAtt/:id*')
        .get((req, res)=>{ sujetController.getAttSujet(req, res) });

    router.route('/sujetByUser/:id*')   
        .get((req, res)=>{ sujetController.getSujetByUser(req, res) });

    


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

    router.route('/studentById/:id*')
        .get((req, res)=>{ studentController.getStudentById(req, res) });

    

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
//----------------------------------Choix API----------------------------------------------------
//______________________________________________________________________________________________

    router.route('/choix/:id*?')
        .post(function(req, res) {choixController.create(req, res)})
        .get((req, res) => {choixController.index(req, res)})
        .put(function(req, res) {choixController.put(req, res)})
        .delete(function(req, res) {choixController.delete(req, res)});

    router.route('/choixs/:id*?').get(function(req, res){choixController.getStudentsPerSujet(req, res)})
        .delete(function(req, res){choixController.deleteByStudent(req, res)})
   

//______________________________________________________________________________________________
//----------------------------------Soutenance--------------------------------------------------
//______________________________________________________________________________________________


    router.route('/soutenance/')
        .post(function(req, res) { soutenanceController.create(req, res)})

//______________________________________________________________________________________________
//----------------------------------Messages API--------------------------------------------------
//______________________________________________________________________________________________


router.route('/messages/:id*?')
.post(function(req, res) { MessageController.create(req, res)})
.get(function(req, res) { MessageController.index(req, res) } )


//______________________________________________________________________________________________
//----------------------------------files API--------------------------------------------------
//______________________________________________________________________________________________


router.route('/files/:id*?')
.get(function(req, res) { fileController.index(req, res) } )


}