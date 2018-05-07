var File = require('../models/file')

module.exports = {
   
    index: (req , res) => {

        File.find({sujet_id: req.params.id} ,(err, files) => {

            if (err)
                res.send(err);
            res.json(files);

        });
      
    },

    delete:  (req , res) => {
      
    },

    put: (req , res) => {

    }

};