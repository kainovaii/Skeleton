const Service = require("../services/TestService")
const Biodata = require("../model/Biodata");

module.exports = {
    index: function(req, res) {
        Biodata.get(req.con, function(err, rows) {
            res.render("manager", { dataService: rows, view: 'manager/home.ejs' })
        })
    },

}
