const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")
const ManagerController = require("../controller/ManagerController")

router.get("/", BaseController.home)

// Manager routes
router.get("/manager", ManagerController.dashboard)
router.get("/manager/connexion", ManagerController.loginFront)
router.post("/manager/connexion", ManagerController.loginReq)
router.get("/manager/deconnexion", ManagerController.logout)

module.exports = router