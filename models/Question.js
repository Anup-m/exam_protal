const mongoose = require("mongoose");

//teacher schema
const QuestionSchema = mongoose.Schema({
  question: {
    require: true,
    type: String,
    trim: true
  },
  subject_code: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Question", QuestionSchema);
