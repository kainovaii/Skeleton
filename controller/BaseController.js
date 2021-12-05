const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        const session = req.session;
        if (session) {
            res.render("app", {view: 'front/home.ejs', session: session})
        } else {
            res.render("app", {view: 'front/home.ejs'})
        }

    },


}