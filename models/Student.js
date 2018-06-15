const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"]
  }
});

module.exports = Student = mongoose.model("students", StudentSchema);
