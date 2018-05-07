var Message = require('../models/message')

module.exports = {

    create: (req , res) => {
        
        var message = new Message();  

        message.sujet_id = req.body.sujet_id
        message.message = req.body.message
        message.who = req.body.who
    
        message.save((err) => {

            if (err){ 
                res.send(err);
            }
            
            res.json({ message: 'Message => created!' })
                
        });

    },

    index: (req , res) => {

        Message.find({sujet_id: req.params.id} ,(err, messages) => {

            if (err)
                res.send(err);
            res.json(messages);

        });
      
    },

    delete:  (req , res) => {
      
    },

    put: (req , res) => {

    }

};