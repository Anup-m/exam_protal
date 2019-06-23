var express = require("express");
var routerQuestion = express();

//Question  Model
var Question = require("../../models/Question");
var Subject = require("../../models/Subject");

//GET route for Question...
//returns all questions...
routerQuestion.get("/", (req, res) => {
  Question.find()
    .then(question => res.json(question))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        msg: "bad request"
      });
    });
});

//GET route to '/addQuestion' for Question...
routerQuestion.get('/addQuestion', (req, res) => {
  Subject.find().then(result=>{
    res.render('question/addQuestion',{ subjects : result});
  });
});

//POST route for Question...
//route to add questions...
routerQuestion.post("/addQuestion", (req, res) => {
  const question = new Question(req.body);

  question
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        msg: "question added",
        question: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        msg: "bad request"
      });
    });
});

//PUT route for Question...
//updates a question for the given questionId...
routerQuestion.put("/:questionId", (req, res) => {
  Question.findOneAndUpdate({ _id: req.params.questionId }, req.body, {
    new: true
  })
    .exec()
    .then(result => {
      console.log("Qustion udpated", result);
      res.status(200).json({
        msg: "Question updated",
        question: result
      });
    });
});

//DELETE route for Question...
//deletes a question for the given questionId...
routerQuestion.delete("/:questionId", (req, res) => {
  Question.findOneAndDelete({ _id: req.params.questionId }, req.body)
    .exec()
    .then(result => {
      console.log("Qustion deleted");
      res.status(200).json({
        msg: "Question deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: err
      });
    });
});

module.exports = routerQuestion;
