const ApiModel = require("../model/ApiModel");

module.exports = {
    home: function(req, res) {

    },
    login: function(req, res) {
        res.render('front/login.ejs')
    },
    dashboard: function(req, res) {
        res.render("wrapper", { view: 'front/dashboard.ejs' })
    },
}