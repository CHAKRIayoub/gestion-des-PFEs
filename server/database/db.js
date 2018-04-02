var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users'); 
module.exports = mongoose;

// c:\Program Files\MongoDB\Server\3.2\bin
// mongod.exe --dbpath C:/data/db --repair
// mongod.exe --dbpath C:\data\db --storageEngine=mmapv1


