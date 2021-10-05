const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")

router.get("/", BaseController.home)
router.get("/app/connexion", BaseController.login)
router.get("/app", BaseController.dashboard)
module.exports = router