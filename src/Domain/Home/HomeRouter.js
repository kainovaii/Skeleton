const express = require("express")
const router = express.Router()

const Current = require("./HomeController")

router.get("/", Current.home)

module.exports = router