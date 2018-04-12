var mongoose = require('../database/db');

var Schema = mongoose.Schema;

var studentSchema = new Schema({
    cni: String, 
    cne: Number,
    filiere_id: String,
    user_id: String
});

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;