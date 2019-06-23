const mongoose = require("mongoose");

//teacher schema
const StudentSchema = mongoose.Schema({
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
    type: String,
    trim: true
  },
  department: {
    require: true,
    type: String,
    trim: true
  },
  roll_no: {
    require: true,
    type: String,
    trim: true
  },
  mobile: {
    require: true,
    type: Number,
    trim: true
  }
});

module.exports = mongoose.model("Student", StudentSchema);
