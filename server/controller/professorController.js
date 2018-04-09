var Professor = require('../models/professor');

module.exports = {

    create: (req , res) => {

        var user = new Professor();      
        professor.CNI = req.body.cni
        professor.filiere_id = req.body.filiere_id
        professor.user_id = req.body.user_id

        professor.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'user created!' })
                
        });

    },

    index: (req , res) => {

        Professor.find((err, professors) => {

            if (err)
                res.send(err);
            res.json(professors);

        });
      
    },

    delete:  (req , res) => {

        Professor.remove({
            _id: req.params.id
        }, (err, professor) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        Professor.findById(req.params.id, (err, professor) => {

            if (err)
                res.send(err);

            professor.CNI = req.body.cni
            professor.filiere_id = req.body.filiere_id
            professor.user_id = req.body.user_id


            professor.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'user updated!' });

            });
        });
      
    }

};