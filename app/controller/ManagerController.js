const ServiceModel = require("../model/ServiceModel");
const InvoiceModel = require("../model/InvoiceModel");
const WalletModel = require("../model/WalletModel");

module.exports = {
    dashboard: function(req, res) {
        const session = req.session;

        res.render("app", {view: 'front/client/home.ejs', session: session});
    },
    service: function(req, res) {
        const session = req.session;
        const message = req.session.message

        ServiceModel.getAllServiceByUser(req.con, session.userid,function (err, services) {
            res.render("app", {view: 'front/client/service/home.ejs', session: session, services: services, message: message});
        })
    },
    service_single: function(req, res) {
        const session = req.session;
        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            res.render("app", {view: 'front/client/service/single.ejs', session: session, service: service});
        })
    },
    wallet: function(req, res) {
        const session = req.session;

        WalletModel.tran_getByUser(req.con, session.username,function (err, wallet) {
            res.render("app", {view: 'front/client/wallet/home.ejs', session: session, wallet: wallet});
        })
    },
    wallet_credit: function(req, res) {
        const session = req.session;

        res.render("app", {view: 'front/client/wallet/single.ejs', session: session});
    },
    domain: function(req, res) {
        const session = req.session;

        res.render("app", {view: 'front/client/domain/home.ejs', session: session});
    },
    domain_single: function(req, res) {
        const session = req.session;

        res.render("app", {view: 'front/client/domain/single.ejs', session: session});
    },
    invoice: function(req, res) {
        const session = req.session;

        InvoiceModel.getAllInvoiceByUser(req.con, session.userid,function (err, invoice) {
            res.render("app", {view: 'front/client/invoice/home.ejs', session: session, invoice: invoice});
        })
    },
    invoice_single: function(req, res) {
        const session = req.session;

        InvoiceModel.getAllInvoiceByUser(req.con, session.userid,function (err, invoice) {
            res.render("app", {view: 'front/client/invoice/single.ejs', session: session, invoice: invoice});
        })
    },
    account: function(req, res) {
        const session = req.session;

        res.render("app", {view: 'front/client/account/home.ejs', session: session});
    },
}