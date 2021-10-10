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
        res.render("wrapper", {view: 'front/dashboard.ejs', username: req.session.userid})
    },

    test: function (req, res) {
        AppModel.get(req.con, function (err, rows) {
            rows.forEach(function (data) {
                console.log(data.fname)
            })
        })
    }
}