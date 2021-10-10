const express = require("express")
require("dotenv").config()
const sessions = require("express-session")
const app = express()
var methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const path = require("path")
const con = require("./config/db.js")
// Using pug template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// connecting route to database
app.use(function(req, res, next) {
  if (req.hostname === process.env.APP_DOMAIN || 'www.' + process.env.APP_DOMAIN) {
    req.con = con
    next()
  }
})

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));

app.get('/user',(req, res) => {

  req.session.userid = "mabite";
  console.log(req.session)
  res.redirect("/app")
})

// parsing body request
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, '/')));

// include router
const Router = require("./routes/Router")

// routing
app.use("/", Router)


// starting server
app.listen(process.env.APP_PORT, function() {
  console.log("server listening on port " + process.env.APP_PORT)
})