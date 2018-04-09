var Projet     = require('../models/projet');

module.exports = {


    create: (req , res) => {

        var projet = new Projet();      
        projet.student_id = req.body.student_id
        projet.sujet_id = req.body.sujet_id

        projet.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'user created!' })
                
        });

    },

    index: (req , res) => {

        Projet.find((err, projets) => {

            if (err)
                res.send(err);
            res.json(projets);

        });
      
    },

    delete:  (req , res) => {

        Projet.remove({
            _id: req.params.id
        }, (err, projet) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        Projet.findById(req.params.id, (err, projet) => {

            if (err)
                res.send(err);
    
            projet.student_id = req.body.student_id
            projet.sujet_id = req.body.sujet_id

            projet.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'user updated!' });

            });
        });
      
    }

};