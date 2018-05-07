var Message = require('../models/message')
var File = require('../models/file')

var multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      
      cb(null, Date.now() + file.originalname);
    }
  });

  var upload = multer({ storage: storage })


module.exports = function(app, router) {

    router.post("/uploadfile",upload.single('sharedfile'),function(req, res) {

        var file = new File();  

        file.sujet_id = req.body.sujet_id
        file.path = req.file.filename
        file.author = req.body.author
        file.who = req.body.who
    
        file.save((err) => {

            if (err)
                res.send(err);
                            
        });
        
        var message = new Message();  

        message.sujet_id = req.body.sujet_id
        message.message = "Nouveau fichier '"+ req.file.filename
        message.who = req.body.who
    
        message.save((err) => { 

            if (err)
                res.send(err);
            
                
        });
        
        
        res.send(req.file)
    })

}