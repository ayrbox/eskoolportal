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
  },
  address:  {
    type: String,
    required: true    
  },
  contactNo: {
    type: String,
    required: true
  }, 
  email: {
    type: String    
  },
  contactPerson: [
    {
      name: {
        type: String,
        required: true
      },
      relation: {
        type: String,
        required: true
      },
      contactNo: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Student = mongoose.model("students", StudentSchema);
