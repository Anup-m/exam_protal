const mongoose = require("mongoose");

//Subject schema
const SubjectSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    trim: true
  },
  code: {
    require: true,
    type: String,
    unique: true,
    trim: true
  },
  department: {
    require: true,
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Subject", SubjectSchema);
