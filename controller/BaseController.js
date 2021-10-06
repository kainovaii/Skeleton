const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        // Verif logged or unlogged
    },
    login: function(req, res) {
        res.render('front/login.ejs')
    },
    dashboard: function(req, res) {

        AppModel.get(req.con, function (err, rows) {
            res.render("wrapper", {view: 'front/dashboard.ejs', data: rows})

            rows.forEach(function (data) {
                console.log(data.fname)
            })
        })


    },
}