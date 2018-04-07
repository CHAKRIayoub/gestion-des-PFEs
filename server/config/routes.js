const userController = require('../controller/userController');
const menuController = require('../controller/menuController');

module.exports = function(app, router) {

router.use(function(req, res, next) {

    next();

});

//______________________________________________________________________________________________
//----------------------------------User API----------------------------------------------------
//______________________________________________________________________________________________

router.route('/users/checkuser').post(function(req, res) {

    userController.checkuser(req, res);

})

router.route('/users/:user_id*?')

     .post(function(req, res) {

        userController.create(req, res);

    })

    .get((req, res) => {

        userController.index(req, res);

    })

    .put(function(req, res) {

        userController.put(req, res);
      
    })

    .delete(function(req, res) {

        userController.delete(req, res);

    });

//______________________________________________________________________________________________
//----------------------------------Menu API----------------------------------------------------
//______________________________________________________________________________________________

    router.route('/menu/:id*?').get((req, res) => {

        menuController.index(req, res);

    })

   .post((req, res) => {
        menuController.add(req, res);
   })

}