const mongoose = require("mongoose");

//Teacher schema
const TeacherSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
    trim: true
  },
  email: {
    require: true,
    type: String,
    unique: true,
    trim: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  password: {
    require: true,
    type: String
    //trim:true
  },
  department: {
    require: true,
    type: String,
    trim: true
  },
  mobile: {
    require: true,
    type: Number,
    trim: true
  },
  active: {
    require: true,
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Teacher", TeacherSchema);
