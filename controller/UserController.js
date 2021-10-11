const AppModel = require("../model/AppModel");
const bcrypt = require('bcrypt');
const vardump = require("@smartankur4u/vardump")

module.exports = {


    login: function(req, res) {
        res.render('front/login.ejs')
    },

    login2: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;


        AppModel.get_user(req.con, username,function (err, rows) {
            rows.forEach(function (user) {
                req.session.userid = user.id
                res.redirect("/app")
            })
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        console.log(req.session)
        res.redirect("/app")
    },
}