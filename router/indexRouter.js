var express = require("express");
var router = express();

var indexRouterAdmin = require("./admin/index");

var indexRouterTeachers = require("./teachers/index");
var indexRouterAdmin = require("./admin/index");
var indexRouterStudents = require("./students/index");
var indexRoouterQuestion = require("./question/index");
var indexRouterSubjects = require('./subject/index');
var routerDepartments = require('./department/index');


//router for admin,teacher,students,subjects,questions,departments route
router.use("/admin", indexRouterAdmin);
router.use("/teachers", indexRouterTeachers);
router.use("/students", indexRouterStudents);
router.use("/departments",routerDepartments);
router.use("/questions", indexRoouterQuestion);
router.use("/subjects",indexRouterSubjects);


router.get("/", function(req, res) {
  res.render("index", { title: "Online Examination" });
});

//exports statements
module.exports = router;
