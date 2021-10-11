const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {

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

}