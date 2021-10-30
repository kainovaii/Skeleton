const AppModel = require("../model/AppModel");
const bcrypt = require('bcryptjs');
const vardump = require("@smartankur4u/vardump")

module.exports = {
    dashboard: function(req, res) {
        AppModel.getUserID(req.con, req.session.userid,function (err, user) {
            if (req.session.userid)
            {
                res.render("manager", {view: 'front/manager/dashboard.ejs', data: user})
            } else {
                res.redirect("/manager/connexion")
            }
        })
    },

    loginFront: function(req, res) {
        if (req.session.userid)
        {
            res.redirect('/manager')
        } else {
            res.render('front/manager/login.ejs')
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
                    res.redirect("/manager")
                } else {
                    res.redirect("/manager")
                }
            })
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        res.redirect("/manager")
    },
}