var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var filiereSchema = new Schema({
    libelle: String
});

var Filiere = mongoose.model("Filiere", filiereSchema);
module.exports = Filiere;