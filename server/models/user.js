var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  nom: String,
  prenom: String,
  password: String,
  email: { type: String, index: true },
  role: String,
});

var User = mongoose.model("User", userSchema);
module.exports = User;