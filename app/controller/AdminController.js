const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        const session = req.session;
        session.message = "";

        res.render("admin", {view: 'admin/home.ejs', session: session})
    },
}