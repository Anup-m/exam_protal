var express = require("express");
var bcrypt = require("bcryptjs");

var routerTeachers = express();

//Teacher  Model
var Teacher = require("../../models/Teachers");

//Department  Model
var Department = require("../../models/Department");

//GET route for Teacher...
//returns all teachers...
routerTeachers.get("/", (req, res) => {
  Teacher.find()
    .then(teacher => res.json(teacher))
    .catch(err => {
      console.log(err);
      res.status(404).json({
        msg: "bad request"
      });
    });
});
routerTeachers.get('/try',(req,res)=>{
  res.send("work");
});


//GET route to '/register' for Teacher
routerTeachers.get("/signup", (req, res) => {
  console.log("msg");
  Department.find().then(result => {
    console.log(result);
    res.render("teacher/signup", { departments: result });
  });
});

//POST route to register a teacher
routerTeachers.post("/signup", (req, res) => {
  Teacher.find({ email: req.body.email })
    .exec()
    .then(teacher => {
      if (teacher.length >= 1) {
        return res.status(409).json({
          msg: "email already exists"
        });
      }
      bcrypt.hash(req.body.password, 8, function(err, hash) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        } else {
          const teacher = new Teacher({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            department: req.body.department,
            mobile: req.body.mobile
          });
          teacher
            .save()
            .then(result => {
              console.log(result);
              // res.status(201).json({
              //   msg: "teacher created",
              //   teacher: teacher
              // });
              res.redirect("./signin");
            })
            .catch(err => {
              console.log(err);
              res.status(400).json({
                msg: "badddddd request"
              });
            });
        }
      });
    });
});

//GET route to '/login' for Teacher
routerTeachers.get("/signin", (req, res) => {
  res.render("teacher/signin");
});

//POST route to login for a Teacher
routerTeachers.post("/signin", (req, res) => {
  console.log(req.body.email);
  Teacher.findOne({ email: req.body.email })
    .then(teacher => {
      console.log("msg");
      console.log(teacher);
      bcrypt.compare(req.body.password, teacher.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            msg: "bcrypt err failed"
          });
        }
        if (result) {
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
//get profile for teacher

routerTeachers.get("/profile", (req, res) => {
  res.render("teacher/profile", { title: "Online Examination" });
});

//PUT route for Teacher
routerTeachers.put("/:teacherId", (req, res) => {
  Teacher.findOneAndUpdate({ _id: req.params.teacherId }, req.body)
    .then(result => {
      res.status(200).json({
        msg: "update success",
        teacher: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "bad request"
      });
    });
});

//DELET route for Teacher
routerTeachers.delete("/:teacherId", (req, res) => {
  Teacher.findOneAndDelete({ _id: req.params.teacherId }, req.body)
    .then(result => {
      res.status(200).json({
        msg: "delete success"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "bad request"
      });
    });
});

//GET route to fetch a single teacher
routerTeachers.get("/:teacherId", (req, res) => {
  Teacher.findOne({ _id: req.params.teacherId }, req.body)
    .then(result => {
      res.status(200).json({
        msg: "teacher found success",
        teacher: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        msg: "bad request"
      });
    });
});



module.exports = routerTeachers;
