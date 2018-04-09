var Filiere     = require('../models/filiere');

module.exports = {

    create: (req , res) => {

        var filiere = new Filiere();      
        filiere.libelle = req.body.libelle;  
       

        filiere.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'user created!' })
                
        });

    },

    index: (req , res) => {

        if(req.params.id){
            Filiere.findOne({_id: req.params.id},(err, filiere) => {

                if (err)
                    res.send(err);
                res.json(filiere);
    
            });
        }else {

            Filiere.find((err, filieres) => {

                if (err)
                    res.send(err);
                res.json(filieres);
    
            });

        }

        
      
    },

    delete:  (req , res) => {

        User.remove({
            _id: req.params.id
        }, (err, filiere) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        Filiere.findById(req.params.id, (err, user) => {

            if (err)
                res.send(err);
           
            filiere.libelle = req.body.libelle;
            
            filiere.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'user updated!' });

            });
        });
      
    }

};