var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var sujetSchema = new Schema({
  titre: String,
  description: String,
  technologies: String,
  filiere_id: String,  
  professor_id: String,
});

var Sujet = mongoose.model("Sujet", sujetSchema);
module.exports = Sujet;