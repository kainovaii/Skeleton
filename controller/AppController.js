const AppModel = require("../model/AppModel");
const ServerModel = require("../model/ServerModel");
const bcrypt = require('bcryptjs');
const vardump = require("@smartankur4u/vardump")

module.exports = {
    dashboard: function(req, res) {
        AppModel.getUserID(req.con, req.session.userid,function (err, user) {
            ServerModel.getServerByID(req.con, req.params.id,function (err, server) {
                if (req.session.userid)
                {
                    res.render("client", {view: 'front/app/dashboard.ejs', data: user, data_server: server})
                } else {
                    res.redirect("/app/connexion")
                }
            })
        })
    },

    myServer: function(req, res) {
        AppModel.getUserID(req.con, req.session.userid,function (err, user) {
            ServerModel.getServerByUser(req.con, req.session.userid,function (err, server) {
                if (req.session.userid)
                {
                    res.render("client", {view: 'front/app/my_server.ejs', data: user, data_server: server})
                } else {
                    res.redirect("/app/connexion")
                }
            })
        })
    },

    loginFront: function(req, res) {
        if (req.session.userid)
        {
            res.redirect('/app/mes-serveurs')
        } else {
            res.render('front/app/login.ejs')
        }
    },

    appHome: function(req, res) {
        if (req.session.userid)
        {
            res.redirect('/app/mes-serveurs')
        } else {
            res.redirect('/app/connexion')
        }
    },

    loginReq: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        AppModel.getUser(req.con, email,function (err, user) {

            user.forEach(function (user) {
                if (bcrypt.compareSync(password, user.password) === true)
                {
                    req.session.userid = user.id
                    res.redirect("/app/mes-serveurs")
                } else {
                    res.redirect("/app")
                }
            })
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        res.redirect("/app")
    },
}