const ApiModel = require("../model/ApiModel");
const vardump = require('@smartankur4u/vardump')

module.exports = {
  get: function(req, res) {
    ApiModel.get(req.con, req.params.table, function(err, rows) {

      vardump(rows)

      //res.end(JSON.stringify(rows))
    })
  },
}