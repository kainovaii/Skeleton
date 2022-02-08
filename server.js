const express = require("express")
require("dotenv").config()
const sessions = require("express-session")
const app = express()
var methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const path = require("path")
const con = require("./app/config/db.js")
const bodyParser = require("body-parser")
const paypal = require('paypal-rest-sdk');
const consoleColor = require("@yaireo/console-colors")
app.set("views", path.join(__dirname, "app/views"))
app.set("view engine", "ejs")


// connecting route to database
app.use(function(req, res, next) {
  if (req.hostname === process.env.APP_DOMAIN || 'www.' + process.env.APP_DOMAIN) {
    req.con = con
    next()
  }
})
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));

paypal.configure({
  'mode': process.env.PAYPAL_ENV,
  'client_id': process.env.PAYPAL_ID,
  'client_secret': process.env.PAYPAL_SECRET
});

// parsing body request
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, '/')));

// include router
const Router = require("./app/routes/Router")
const http = require("http");
const https = require("https");
const fs = require("fs");

// routing
app.use("/", Router)

// starting server
app.listen(process.env.APP_PORT, function() {
  console.log("server listening on port " + process.env.APP_PORT)
})

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'root'
}, app).listen(process.env.APP_SSL_PORT);