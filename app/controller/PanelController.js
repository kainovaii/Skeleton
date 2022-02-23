const ServiceModel = require("../model/ServiceModel");
const UserModel = require("../model/UserModel");

module.exports = {
    terminal: function(req, res) {
        const session = req.session;
        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            res.render("app", {view: 'front/client/service/panel/terminal.ejs', session: session, service: service});
        })
    },
    save: function(req, res) {
        const session = req.session;
        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            res.render("app", {view: 'front/client/service/panel/save.ejs', session: session, service: service});
        })
    },
    reinstallation: function(req, res) {
        const session = req.session;
        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            res.render("app", {view: 'front/client/service/panel/reinstallation.ejs', session: session, service: service});
        })
    },
    firewall: function(req, res) {
        const session = req.session;
        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            res.render("app", {view: 'front/client/service/panel/firewall.ejs', session: session, service: service});
        })
    },
    users: function(req, res) {
        const session = req.session;
        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            ServiceModel.getServiceSharedUser(req.con, service_id,function (err, users) {
                if (users.length > 0)
                {
                    users.forEach(function (users) {
                        UserModel.getUserID(req.con, users.id,function (err, users) {
                            res.render("app", {view: 'front/client/service/panel/users.ejs', session: session, service: service, users: users});
                        })
                    })
                } else {
                    users === {};
                    res.render("app", {view: 'front/client/service/panel/users.ejs', session: session, service: service, users: users});
                }
            })
        })
    },


}