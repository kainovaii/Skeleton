const express = require("express")
require("dotenv").config()
const sessions = require("express-session")
const app = express()
const methodOverride = require("method-override")
const cookieParser = require("cookie-parser")
const path = require("path")
const con = require("./src/Config/Database")
const bodyParser = require("body-parser")
const paypal = require('paypal-rest-sdk');
const flash = require('connect-flash');
const engine = require('express-engine-jsx');

app.set("views", path.join(__dirname, "src/Template"))
app.set('view engine', 'jsx');
app.engine('jsx', engine);

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

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, '/')));
app.use(flash());

// include router
const HomeRouter = require("./src/Domain/Home/HomeRouter");
const AuthRouter = require("./src/Domain/Auth/AuthRouter");

const http = require("http");
const https = require("https");
const fs = require("fs");

// routing
app.use("/", HomeRouter, AuthRouter)

// starting server
app.listen(process.env.APP_PORT, function() {
  console.log("server listening on port " + process.env.APP_PORT)
})

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'root'
}, app).listen(process.env.APP_SSL_PORT);