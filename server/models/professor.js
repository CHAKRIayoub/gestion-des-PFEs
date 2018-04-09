var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var menuSchema = new Schema({
   CNI: String,
   filiere_id: String,
   user_id: String
});

var Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;