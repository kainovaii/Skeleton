const User = require("../Auth/AuthModel")

module.exports = {
    home: function(req, Templater) {
        Templater.render("Home")
    },
}