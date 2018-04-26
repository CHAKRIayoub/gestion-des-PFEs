var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var SoutenanceSchema = new Schema({
    sujet_id: String,
    date: Date,
    jury: String
});

var Soutenance = mongoose.model("Soutenance", SoutenanceSchema);
module.exports = Soutenance;