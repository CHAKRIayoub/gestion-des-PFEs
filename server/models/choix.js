var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var choixSchema = new Schema({
    student_id: String,
    sujet_id: String, 
    order: Number
});

var Choix = mongoose.model("Choix", choixSchema);
module.exports = Choix;