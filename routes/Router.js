const express = require("express")
const router = express.Router()
const BaseController = require("../controller/BaseController")
const ManagerController = require("../controller/ManagerController")

router.get("/", BaseController.index)
router.get("/portfolio", BaseController.portfolio)
router.get("/contact", BaseController.contact)
router.get("/legal", BaseController.legal)

router.get("/manager", ManagerController.index)

router.get("/create", BaseController.create)
router.post("/", BaseController.store)
router.get("/:id/edit", BaseController.edit)
router.put("/:id", BaseController.update)
router.delete("/:id", BaseController.destroy)
module.exports = router