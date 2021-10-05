const express = require("express")
const session = require("express-session")
const app = express()
var methodOverride = require("method-override")
const path = require("path")
const con = require("./config/db.js")
const vardump = require('@smartankur4u/vardump')

// Using pug template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")



// connecting route to database
app.use(function(req, res, next) {
  req.con = con
  next()

  req.vardump = vardump;

  session({
    secret: 'Keep it secret',
    name: 'uniqueSessionID',
    saveUninitialized: false,
  })

})

// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, '/')));

// include router
const Router = require("./routes/router")

// routing
app.use("/", Router)

// starting server
app.listen(3000, function() {
  console.log("server listening on port 3000")
})
