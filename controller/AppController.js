const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {

    dashboard: function(req, res) {
        AppModel.getUserID(req.con, req.session.userid,function (err, user) {
            if (req.session.userid)
            {
                res.render("wrapper", {view: 'front/dashboard.ejs', data: user})
            } else {
                res.redirect("/manager/connexion")
            }
        })
    },

}