var Student     = require('../models/student');

module.exports = {

    getStudent: (req, res) => {

        Student.findOne({user_id: req.params.id} ,(err, student) => {

            if (err)
                res.send(err);
        
            res.json(student);

        });

    },

    create: (req , res) => {

        var student = new Student();      
        student.cni = req.body.cni
        student.cne = req.body.cne
        student.filiere_id = req.body.filiere_id 
        student.user_id = req.body.user_id

        student.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'student created!' })
                
        });

    },

    index: (req , res) => {

        Student.find((err, students) => {

            if (err)
                res.send(err);
            res.json(students);

        });
      
    },

    delete:  (req , res) => {

        Student.remove({
            _id: req.params.id
        }, (err, student) => {

            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });

        });
      
    },

    put: (req , res) => {

        Student.findById(req.params.id, (err, student) => {

            if (err)
                res.send(err);
                
            student.cni = req.body.cni
            student.cne = req.body.cne
            student.filiere_id = req.body.filiere_id 
            student.user_id = req.body.user_id
        

            student.save((err) => {

                if (err)
                    res.send(err);
                res.json({ message: 'user updated!' });

            });
        });
      
    }

};