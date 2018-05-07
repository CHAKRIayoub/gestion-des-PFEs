var Choix = require('../models/choix');
var User = require('../models/user');

module.exports = {

    getStudentsPerSujet:(req, res)=>{
        Choix.find({sujet_id: req.params.id},(err, students) => {
                 
            if (err) 
                res.send(err);
            res.json(students);
            
        })
    },

    create: (req , res) => {
        var rtrn = ""
        Choix.find({student_id: req.params.id},(err, choixs) => {
            if (err) rtrn = err
            if(choixs.length > 0){
                choixs.forEach((element,index) => {
                    element.sujet_id = req.body.choices[index].sujet_id
                    element.order = req.body.choices[index].order
                    element.save((err) => {
                        if (err)rtrn = err
                        rtrn = 'choice updated!' 
                    })
                })
            }
            else{
                req.body.choices.forEach(element => {
                    var choix = new Choix();      
                    choix.student_id = req.params.id
                    choix.sujet_id = element.sujet_id
                    choix.order = element.order
                    choix.save((err) => {
                        if (err) rtrn=err
                        rtrn = 'choix created!' 
                    })
                })
            }
            res.send(rtrn);
        })
    },

    index: (req , res) => {

        Choix.find({student_id: req.params.id},(err, choixs) => {

            if (err)
                res.send(err);
            res.json(choixs);

        });
      
    },

    deleteByStudent: (req, res) => {

        Choix.find({student_id: req.params.id},(err, choixs) => {

            if (err)
                res.send(err);

            choixs.forEach(element => {

                Choix.remove({
                    _id : element._id
                }, (err, choix) => {
        
                    if (err)
                        res.send(err);
                        
                });
                
            });

            res.json({ message: 'Successfully deleted' });

        });

    },

    delete:  (req , res) => {

        Choix.remove({
            _id: req.params.id
        }, (err, choix) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        Choix.findById(req.params.id, (err, choix) => {

            if (err)
                res.send(err);
    
            choix.student_id = req.body.student_id
            choix.sujet_id = req.body.sujet_id
            choix.order = req.body.order

            choix.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'user updated!' });

            });
        });
      
    }

};