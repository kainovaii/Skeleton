const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")

router.get("/", BaseController.home)
router.get("/app/connexion", BaseController.login)
router.get("/app", BaseController.dashboard)

router.post("/app/connexion", BaseController.login2)


router.get("/app/deconnexion",(req, res) => {
    req.session.destroy()
    console.log(req.session)
    res.redirect("/app")
})

// Dev routes
router.get("/app/test_login", BaseController.test_login)

module.exports = router