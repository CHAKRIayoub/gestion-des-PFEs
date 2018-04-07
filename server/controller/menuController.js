var Menu     = require('../models/menu');

module.exports = {

    index: (req, res) => {

        // console.log(req.params);
        
        Menu.find( {'id' : req.params.id}  ,(err, menu) => {

            if (err)
                  res.send(err);
            res.json(menu);

        });

    },

    add: (req, res) => {
        var menu    = new Menu(); 
        menu.id     =   req.body.id;     
        menu.icon   = req.body.icon;  
        menu.title  = req.body.title;
        menu.link   = req.body.link;  
   
        // menu.menu = [
        //         {icon: 'home', title: 'Principale', link: '/'},
        //         {icon: 'face', title: 'Professor', link: '/professor'},
        //         {icon: 'person', title: 'Sujets', link: '/sujets'},
        // ]

        menu.save((err) => {

            if (err){ 
                res.send(err);
            }
            res.json({ message: 'menu created!' })
                
        });

    }

};