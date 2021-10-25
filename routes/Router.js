const express = require("express")
const router = express.Router()
const cp = require('child_process');
const BaseController = require("../controller/BaseController")
const UserController = require("../controller/UserController")
const AppController = require("../controller/AppController")

router.get("/", BaseController.home)


// Manager routes
router.get("/manager", AppController.dashboard)
router.get("/manager/connexion", UserController.login)
router.post("/manager/connexion", UserController.login2)
router.get("/manager/deconnexion", UserController.logout)

router.get("/start", function () {
    cp.exec('../bot/start.sh', function(err, stdout, stderr) {

    });
})

module.exports = router