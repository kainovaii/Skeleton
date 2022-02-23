const AppModel = require("../model/UserModel");
const ServiceModel = require("../model/ServiceModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        const session = req.session;
        session.message = "";

        res.render("admin", {view: 'admin/home.ejs', session: session})
    },

    client_all: function(req, res) {
        const session = req.session;
        session.message = "";
        AppModel.getAllUser(req.con,function (err, users) {
            res.render("admin", {view: 'admin/client/research.ejs', session: session, users: users})
        })
    },

    client_single: function(req, res) {
        const session = req.session;
        session.message = "";
        const userid = req.params.id;

        AppModel.getUserID(req.con, userid,function (err, user) {
            res.render("admin", {view: 'admin/client/single.ejs', session: session, user: user})
        })
    },

    service_dashboard: function(req, res) {
        const session = req.session;
        session.message = "";

        ServiceModel.getAllService(req.con,function (err, service) {
            res.render("admin", {view: 'admin/service/dashboard.ejs', session: session, service: service})
        })
    },

    support_dashboard: function(req, res) {
        const session = req.session;
        session.message = "";

        ServiceModel.getAllService(req.con,function (err, service) {
            res.render("admin", {view: 'admin/support/dashboard.ejs', session: session, service: service})
        })
    },

    support_research: function(req, res) {
        const session = req.session;
        session.message = "";

        ServiceModel.getAllService(req.con,function (err, service) {
            res.render("admin", {view: 'admin/support/research.ejs', session: session, service: service})
        })
    },

    support_single: function(req, res) {
        const session = req.session;
        session.message = "";

        ServiceModel.getAllService(req.con,function (err, service) {
            res.render("admin", {view: 'admin/support/single.ejs', session: session, service: service})
        })
    },
}