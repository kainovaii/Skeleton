const ServiceModel = require("../model/ServiceModel");
module.exports = {

    create: function(req, data) {

        ServiceModel.create(req.con, data)
    },

};