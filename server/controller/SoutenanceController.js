var Soutenance = require('../models/soutenance')
const envEmail = require('../helpers/envEmail')

module.exports = {

    create: (req , res) => {

        
        var soutenance = new Soutenance();  
        soutenance.sujet_id = req.body.sujet_id
        soutenance.date = req.body.date
        soutenance.jury = req.body.jury
    
        soutenance.save((err) => {

            if (err){ 
                res.send(err);
            }
            
            envEmail.envoyerEmail(req.body.sujet_id)
            res.json({ message: 'Soutenance => created!' })
                
        });

    },

    index: (req , res) => {
      
    },

    delete:  (req , res) => {
      
    },

    put: (req , res) => {

    }

};