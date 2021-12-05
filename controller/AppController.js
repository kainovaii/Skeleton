const AppModel = require("../model/AppModel");
const ServerModel = require("../model/ServerModel");
const bcrypt = require('bcryptjs');
const vardump = require("@smartankur4u/vardump")

module.exports = {

    loginFront: function(req, res) {
        if (req.session.userid)
        {
            AppModel.getUserID(req.con, req.session.userid,function (err, user) {
                res.render("app", {view: 'front/account/home.ejs', data: user})
            })
        } else {
            res.render('front/account/login.ejs')
        }
    },

    appHome: function(req, res) {
        const session = req.session;

        if (req.session.userid)
        {
            AppModel.getUserID(req.con, req.session.userid,function (err, user) {
                res.render("app", {view: 'front/account/home.ejs', data: user, session: session})
            })
        } else {
            res.redirect('/mon-compte/connexion')
        }
    },

    loginReq: function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const session = req.session;

        AppModel.getUser(req.con, username,function (err, user) {

            user.forEach(function (user) {
                if (bcrypt.compareSync(password, user.password) === true)
                {
                    req.session.userid = user.id
                    req.session.username = user.username
                    AppModel.getUserID(req.con, req.session.userid,function (err, user) {
                        res.render("app", {view: 'front/account/home.ejs', data: user, session: session})
                    })
                } else {
                    res.redirect("/mon-compte")
                }
            })
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        res.redirect("/mon-compte")
    },
}