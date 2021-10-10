const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        res.redirect('/app')
    },
    login: function(req, res) {
        res.render('front/login.ejs')
    },

    dashboard: function(req, res) {
        AppModel.get_user(req.con,1,function (err, rows) {
            if (req.session.userid)
            {
                res.render("wrapper", {view: 'front/dashboard.ejs', data: rows})
                console.log(req.session)
            } else {
                res.redirect("/app/connexion")
            }
        })

    },

    test_login: function (req, res) {
        AppModel.get_user(req.con,1,function (err, rows) {
            rows.forEach(function (data) {
                req.session.userid = data.id
                req.session.username = data.username
                res.redirect("/app")
            })
        })
    }
}