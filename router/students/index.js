var express = require("express");
var bcrypt = require("bcryptjs");

var routerStudent = express();

//Student  Model
var Student = require("../../models/Student");

var Department = require("../../models/Department");

//GET route for Student...
//returns all students...
routerStudent.get("/", function(req, res) {
  Student.find()
    .then(student => res.json(student))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        msg: "bad request"
      });
    });
});

//GET route to '/signup' for Student
routerStudent.get("/signup", (req, res) => {
  Department.find()
    .then(result => {
      res.render("student/signup", { departments: result });
    })
    .catch(err => console.log(err));
});

//POST route to '/signup' for Student
routerStudent.post("/signup", (req, res) => {
  Student.find({ email: req.body.email })
    .exec()
    .then(student => {
      if (student.length >= 1) {
        return res.status(409).json({
          msg: "Email already exists"
        });
      }
      bcrypt.hash(req.body.password, 8, function(err, hash) {
        if (err) {
          return res.status(500).json({
            err: err,
            msg: "error in hash"
          });
        } else {
          const student = new Student({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            department: req.body.department,
            roll_no: req.body.roll_no,
            mobile: req.body.mobile
          });
          student
            .save()
            .then(result => {
              console.log(result);
              // res.status(201).json({
              //   msg: "student created",
              //   student: student
              // });
              res.redirect("./signin");
            })
            .catch(err => {
              console.log(err);
              res.status(400).json({
                msg: "bad request"
              });
            });
        }
      });
    });
});

//GET route to '/signin' for Student
routerStudent.get("/signin", (req, res) => {
  res.render("student/signin");
});

//POST route to '/signin' for Student
routerStudent.post("/signin", (req, res) => {
  Student.findOne({ email: req.body.email })
    .then(student => {
      bcrypt.compare(req.body.password, student.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).json({
            msg: "bcrypt failed"
          });
        }
        if (result) {
          // return res.status(200).json({
          //   msg: "auth success"
          // });
          //return res.render("student/profile", { title: "Online Examination" });
          return res.redirect("./profile");
        }
        res.status(401).json({
          msg: "auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "bad request"
      });
    });
});


/// get route for students profile
routerStudent.get('/profile',(req,res)=>{
  res.render('student/profile', { title: "Online Examinationmmmmmmmmmmmmmmm" } );
});

//PUT route for Student
routerStudent.put("/:studentId", (req, res) => {
  // console.log(req.body);
  console.log(req.params.studentId);
  Student.findOneAndUpdate({ _id: req.params.studentId }, req.body, {
    new: true
  })
    .then(result => {
      console.log("student udpated", result);
      res.status(200).json({
        msg: "Student updated",
        student: result
      });
    })
    .catch(err => {
      console.log("something went wrong at student update " + err);
      res.status(400).json({
        msg: "something went wrong"
      });
    });
});

//DELET route for Student
routerStudent.delete("/:studentId", (req, res) => {
  Student.findOneAndDelete({ _id: req.params.studentId }, req.body)
    .then(result => {
      console.log("student deleted");
      res.status(200).json({
        msg: "student deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        msg: "something went wrong"
      });
    });
});

//module exports
module.exports = routerStudent;
