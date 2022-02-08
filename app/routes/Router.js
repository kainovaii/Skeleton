const express = require("express")
const router = express.Router()

// Controllers
const BaseController = require("../controller/BaseController")
const AuthController = require("../controller/AuthController")

// Middlewares
const GuardAuth = require("../middleware/AuthMiddleware")

router.get("/", BaseController.home)

// Auth
router.get("/auth/login", AuthController.loginFront)
router.post("/auth/login", AuthController.loginReq)
router.get("/auth/dashboard", GuardAuth, AuthController.dashboard)
router.get("/auth/logout", GuardAuth, AuthController.logout)
router.get("/auth", GuardAuth, function (req, res) {res.redirect("/auth/dashboard")})

module.exports = router