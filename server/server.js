var express    = require('express');        
var bodyParser = require('body-parser');
var routes     = require('./config/routes');
var app        = express();  
const envEmail = require('./helpers/envEmail')
 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port       = process.env.PORT || 9000; 
var router     = express.Router(); 

app.use('/uploads', express.static('uploads'));

require('./config/routes')(app, router);
require('./helpers/uploadFile')(app, router);

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);

