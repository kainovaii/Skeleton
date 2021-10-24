const AppModel = require("../model/AppModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        res.render("app", {view: 'front/home.ejs'})
    },


}