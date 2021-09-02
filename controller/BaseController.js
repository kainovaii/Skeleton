const Service = require("../services/TestService")
const Biodata = require("../model/Biodata");

module.exports = {
  index: function(req, res) {
    Biodata.get(req.con, function(err, rows) {
      res.render("wrapper", { dataService: rows, view: 'front/home.ejs' })
    })
  },

  portfolio: function(req, res) {
    Biodata.get(req.con, function(err, rows) {
      res.render("wrapper", { data: rows, view: 'front/portfolio.ejs' })
    })
  },

  contact: function(req, res) {
    Biodata.get(req.con, function(err, rows) {
      res.render("wrapper", { data: rows, view: 'front/contact.ejs' })
    })
  },

  legal: function(req, res) {
    Biodata.get(req.con, function(err, rows) {
      res.render("wrapper", { data: rows, view: 'front/legal.ejs' })
    })
  },

  create: function(req, res) {
    res.render("front/create")
  },

  store: function(req, res) {
    Biodata.create(req.con, req.body, function(err) {
      res.redirect("/front")
    })
  },

  edit: function(req, res) {
    Biodata.getById(req.con, req.params.id, function(err, rows) {
      res.render("front/edit", { data: rows[0] })
    })
  },

  update: function(req, res) {
    Biodata.update(req.con, req.body, req.params.id, function(err) {
      res.redirect("/front")
    })
  },

  destroy: function(req, res) {
    Biodata.destroy(req.con, req.params.id, function(err) {
      res.redirect("/front")
    })
  }
}
