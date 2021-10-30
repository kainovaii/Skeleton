const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")
const ManagerController = require("../controller/ManagerController")
const AppController = require("../controller/AppController")

router.get("/", BaseController.home)

// Manager routes
router.get("/manager", ManagerController.dashboard)
router.get("/manager/connexion", ManagerController.loginFront)
router.post("/manager/connexion", ManagerController.loginReq)
router.get("/manager/deconnexion", ManagerController.logout)

// Server routes
router.get("/app/mes-serveurs", AppController.myServer)
router.get("/app/s/:id", AppController.dashboard)
router.get("/app/connexion", AppController.loginFront)
router.post("/app/connexion", AppController.loginReq)
router.get("/app/deconnexion", AppController.logout)
router.get("/app", AppController.appHome)


module.exports = router