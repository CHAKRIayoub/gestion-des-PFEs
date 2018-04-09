var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var projetSchema = new Schema({
    student_id: String,
    sujet_id: String, 

});

var Projet = mongoose.model("Projet", projetSchema);
module.exports = Projet;