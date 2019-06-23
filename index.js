var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var hbs = require('express-handlebars');
//var ejs = require('ejs');

//index router for main page
var indexRouter = require("./router/indexRouter");

//Init Express
var app = express();

//db config
const db = require("./config").mongoMlabURI;

//connect to mongo
mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//body parser for json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//setting up the view engine
//app.engine('ejs',ejs.renderFile);

app.engine('hbs',hbs({extname:'hbs', defaultLayout:'layout', layoutsDir: __dirname + '/views'}));
app.set("views", path.join(__dirname, "views"));
app.set('view engine','hbs');

//router setup with application
app.use("/", indexRouter);

//server listen setup
const port = require("./config").port;
app.listen(port, () => console.log(`Server started at port ${port}`));
