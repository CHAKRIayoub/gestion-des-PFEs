var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var fileSchema = new Schema({

    sujet_id: String,
    path: String,
    author: String,
    who:Boolean

});

var File = mongoose.model("File", fileSchema);
module.exports = File;