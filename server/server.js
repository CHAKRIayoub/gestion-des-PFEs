
var express    = require('express');        
var bodyParser = require('body-parser');
var routes     = require('./config/routes');

var app        = express();   

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var port = process.env.PORT || 9000; 

var router = express.Router(); 

require('./config/routes')(app, router);

app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);