var express = require("express");

var routerAdmin = express();

routerAdmin.get("/", function(req, res) {
  res.render("admin/index.ejs");
});

module.exports = routerAdmin;
