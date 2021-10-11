const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")
const UserController = require("../controller/UserController")

router.get("/", BaseController.home)
router.get("/app", BaseController.dashboard)

// User routes
router.get("/app/connexion", UserController.login)
router.post("/app/connexion", UserController.login2)
router.get("/app/deconnexion", UserController.logout)

module.exports = router