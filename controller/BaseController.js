const AppModel = require("../model/AppModel");
const bcrypt = require('bcrypt');
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {

    },
    login: function(req, res) {
        res.render('front/login.ejs')
    },

    login2: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;


        AppModel.get_user(req.con, username,function (err, rows) {
            rows.forEach(function (data) {
                bcrypt.compare("password", "$2y$10$ZI41xqwb6nWoUajdDyNrP.WME.Wwdg2jXvhh00sbsLp08xLeAlkkS", function(err, result) {
                    console.log(result)

                    // req.session.userid = data.id
                    // res.redirect("/app")
                });
            })
        })
    },

    dashboard: function(req, res) {
        AppModel.get_user(req.con, req.session.userid,function (err, rows) {
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

    }
}