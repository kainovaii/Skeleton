const express = require("express")
const router = express.Router()

const Current = require("./AuthController")

router.get("/", Current.loginFront)

module.exports = router