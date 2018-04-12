var Sujet     = require('../models/sujet');
var Filiere     = require('../models/filiere');
 
module.exports = {

    getSujetByFiliere: (req , res) => {

        Sujet.find({filiere_id: req.params.id} ,(err, sujets) => {

            if (err)
                res.send(err);
        
            res.json(sujets);

        });
      
    },

    getSujet: (req, res) => {

        Sujet.findOne({_id: req.params.id} ,(err, sujet) => {

            if (err)
                res.send(err);
        
            res.json(sujet);

        });

    },

    create: (req , res) => {

        var sujet = new Sujet();  
        sujet.titre = req.body.titre
        sujet.description = req.body.description
        sujet.technologies = req.body.technologies
        sujet.filiere_id = req.body.filiere_id
        sujet.professor_id = req.body.professor_id
       

        sujet.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'Sujet => created!' })
                
        });

    },

    index: (req , res) => {

        Sujet.find({professor_id: req.params.id} ,(err, sujets) => {

            if (err)
                res.send(err);
        
            res.json(sujets);

        });
      
    },
 
    delete:  (req , res) => {

        Sujet.remove({
            _id: req.params.id
        }, (err, user) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        Sujet.findById(req.params.id, (err, sujet) => {

            if (err)
                res.send(err);
            sujet.titre = req.body.titre
            sujet.description = req.body.description
            sujet.technologies = req.body.technologies
            sujet.filiere_id = req.body.filiere_id  

            sujet.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'sujet updated!' });

            });
        });
      
    }

};