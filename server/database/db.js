var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users'); 
module.exports = mongoose;

// c:\Program Files\MongoDB\Server\3.2\bin
// mongod --dbpath C:/data/db --repair
// mongod --dbpath C:\data\db --storageEngine=mmapv1


//ystemctl start mongodb
//         status
