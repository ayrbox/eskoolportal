const mongoose = require("mongose");

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  sections: [
    {
      name: {
        type: String,
        require: true
      },
      note: {
        type: String
      }
    }
  ]
});

module.exports = Class = mongoose.mode("classes", ClassSchema);
