const express = require("express")
const router = express.Router()

// Controllers
const BaseController = require("../controller/BaseController")
const ManagerController = require("../controller/ManagerController")
const AppController = require("../controller/AppController")
const ShopController = require("../controller/ShopController")
const PayPalController = require("../controller/PayPalController")
const AdminController = require("../controller/AdminController")
const PanelController = require("../controller/PanelController")
const ProxmoxController = require("../controller/ProxmoxController")
const LegalController = require("../controller/LegalController")

router.get("/proxmox", ProxmoxController.test)

// Middlewares
const GuardAuth = require("../middleware/AuthMiddleware")
const CartMiddleware = require("../middleware/CartMiddleware")
const AdminMiddleware = require("../middleware/AdminMiddleware")
const PanelMiddleware = require("../middleware/PanelMiddleware")

router.get("/", function (req, res) {
    res.redirect("/fr");
})

router.get("/fr", BaseController.home)
router.get("/fr/mentions-legales", LegalController.legal_mentions)

// Client area routes
router.get("/fr/espace-client/connexion", AppController.loginFront)
router.post("/fr/espace-client/connexion", AppController.loginReq)
router.get("/fr/espace-client/deconnexion", GuardAuth, AppController.logout)
router.get("/fr/espace-client/activation", AppController.activation)
router.get("/fr/espace-client", GuardAuth, ManagerController.dashboard)
router.get("/fr/espace-client/mes-factures", GuardAuth, ManagerController.invoice)
router.get("/fr/espace-client/mes-factures/:id", GuardAuth, ManagerController.invoice_single)
router.get("/fr/espace-client/support", GuardAuth, ManagerController.dashboard)
router.get("/fr/espace-client/portefeuille", GuardAuth, ManagerController.wallet)
router.get("/fr/espace-client/portefeuille/crediter", GuardAuth, ManagerController.wallet)
router.get("/fr/espace-client/mes-domaines", GuardAuth, ManagerController.domain)
router.get("/fr/espace-client/mes-domaines/:id", GuardAuth, ManagerController.domain_single)
router.get("/fr/espace-client/mon-compte", GuardAuth, ManagerController.account)
router.post("/fr/espace-client/mon-compte", GuardAuth, AppController.updateUser)

// Service / Panel routes
router.get("/fr/espace-client/mes-services", GuardAuth, ManagerController.service)
router.get("/fr/espace-client/mes-services/:id", PanelMiddleware.checkServiceStatus, GuardAuth, ManagerController.service_single)
router.get("/fr/espace-client/mes-services/:id/terminal", GuardAuth, PanelController.terminal)
router.get("/fr/espace-client/mes-services/:id/sauvegarde", GuardAuth, PanelController.save)
router.get("/fr/espace-client/mes-services/:id/reinstallation", GuardAuth, PanelController.reinstallation)
router.get("/fr/espace-client/mes-services/:id/firewall", GuardAuth, PanelController.firewall)
router.get("/fr/espace-client/mes-services/:id/utilisateurs", GuardAuth, PanelController.users)

// Shop routes
router.get("/fr/produits/serveurs-vps-standard", ShopController.standardVPS)
router.get("/fr/produits/serveurs-vps-windows", ShopController.windowsVPS)
router.get("/fr/produits/add/:id", ShopController.add)
router.get("/fr/produits/configuration", CartMiddleware.checkEmpty, ShopController.config_index)
router.post("/fr/produits/paiement", GuardAuth, PayPalController.home)
router.get("/fr/produits/failed", GuardAuth, CartMiddleware.checkEmpty, PayPalController.failed)
router.get("/fr/produits/success", GuardAuth, CartMiddleware.checkEmpty, PayPalController.success)
router.get("/fr/produits/paiement", function (res, req) {res.redirect("/fr")})

// Admin routes
router.get("/admin", GuardAuth, AdminMiddleware.checkPower, AdminController.home)
router.get("/admin/client", GuardAuth, AdminMiddleware.checkPower, AdminController.client_all)
router.get("/admin/client/s/:id", GuardAuth, AdminMiddleware.checkPower, AdminController.client_single)
router.get("/admin/service", GuardAuth, AdminMiddleware.checkPower, AdminController.service_dashboard)
router.get("/admin/support", GuardAuth, AdminMiddleware.checkPower, AdminController.support_dashboard)
router.get("/admin/support/research", GuardAuth, AdminMiddleware.checkPower, AdminController.support_research)
router.get("/admin/support/s/:id", GuardAuth, AdminMiddleware.checkPower, AdminController.support_single)

module.exports = router