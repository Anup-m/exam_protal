var express = require("express");
var routerSubject = express();

//Subject Model
var Subject = require("../../models/Subject");
var Department = require('../../models/Department');

//GET route for Subject...
//returns all subjects...
routerSubject.get('/', (req, res) => {
  Subject.find()
    .then(subject => res.json(subject))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        msg: "bad request"
      });
    });
});

//GET route to '/addSubject' for Subjects...
routerSubject.get('/addSubject', (req, res) => {
  Department.find().then(result =>{
    console.log(result);
    res.render('subject/addSubject',{ departments : result });
  }).catch( err => console.log(err));
});


//POST route for Subject...
//route to add subjecs...
routerSubject.post('/addSubject', (req, res) => {
  const subject = new Subject(req.body);

  subject
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        msg: "Subject added",
        subject: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        msg: "bad request"
      });
    });
});

//PUT route for Subject...
//updates a subject for the given subjectCode...
routerSubject.put("/:subjectCode", (req, res) => {
  Question.findOneAndUpdate({ _id: req.params.subjectCode }, req.body, {
    new: true
  })
    .exec()
    .then(result => {
      console.log("subject udpated", result);
      res.status(200).json({
        msg: "subject updated",
        subject: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: err
      });
    });
});

//DELETE route for Subject...
//deletes a subject for the given subjectCode...
routerSubject.delete("/:subjectCode", (req, res) => {
  Subject.findOneAndDelete({ _id: req.params.subjectCode }, req.body)
    .exec()
    .then(result => {
      console.log("Subject deleted");
      res.status(200).json({
        msg: "Subject deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        err: err
      });
    });
});

module.exports = routerSubject;
