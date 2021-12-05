const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")
const ManagerController = require("../controller/ManagerController")
const AppController = require("../controller/AppController")
const ShopController = require("../controller/ShopController")

router.get("/", BaseController.home)
router.get("/boutique", ShopController.home)

// Server routes
router.get("/mon-compte/connexion", AppController.loginFront)
router.post("/mon-compte/connexion", AppController.loginReq)
router.get("/mon-compte/deconnexion", AppController.logout)
router.get("/mon-compte", AppController.appHome)

// Manager routes
router.get("/manager", ManagerController.dashboard)
router.get("/manager/connexion", ManagerController.loginFront)
router.post("/manager/connexion", ManagerController.loginReq)
router.get("/manager/deconnexion", ManagerController.logout)




module.exports = router