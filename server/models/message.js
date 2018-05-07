var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    sujet_id: String,
    message: String,
    who: Boolean
});

var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;