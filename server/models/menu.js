var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var menuSchema = new Schema({
    id: Number,
    icon: String, 
    title: String, 
    link: String
});

var Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;