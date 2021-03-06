var User     = require('../models/user');

module.exports = {

    checkuser: (req, res) => {
        
        User.findOne( req.body  ,(err, user) => {

            if (err)
                  res.send(err);
            res.json(user);

        });

    },

    getUser: (req, res) => {
        
        User.findOne( {_id: req.params.id}  ,(err, user) => {

            if (err)
                  res.send(err);
            res.json(user);

        });

    },

    create: (req , res) => {

        var user = new User();      
        user.nom = req.body.nom;  
        user.prenom = req.body.prenom;
        user.password = req.body.password;  
        user.email = req.body.email; 
        user.role = req.body.role;

        user.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'user created!' })
                
        });

    },

    index: (req , res) => {

        User.find((err, users) => {

            if (err)
                res.send(err);
            res.json(users);

        });
      
    },

    delete:  (req , res) => {

        User.remove({
            _id: req.params.user_id
        }, (err, user) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        User.findById(req.params.user_id, (err, user) => {

            if (err)
                res.send(err);
            user.nom = req.body.nom;  
            user.prenom = req.body.prenom;  
            user.password = req.body.password;  
            user.email = req.body.email; 
            user.role = req.body.role;

            user.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'user updated!' });

            });
        });
      
    }

};