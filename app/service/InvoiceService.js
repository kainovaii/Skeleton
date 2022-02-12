const InvoiceModel = require("../model/InvoiceModel");
module.exports = {

    create: function(req, data) {

        InvoiceModel.create(req.con, data)
    },
};