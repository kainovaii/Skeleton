const AppModel = require("../model/AppModel");
const ShopModel = require("../model/ShopModel");
const vardump = require('@smartankur4u/vardump')
const fileGetContents = require('file-get-contents');

module.exports = {
  getUser: function(req, res) {

    const username = req.body.username;

    AppModel.getUser(req.con, username, function(err, user) {

        if (user.length > 0) {
          res.end("true")

        } else {
          res.end("false")
        }

    })
  },

  createUser: function(req, res) {

    AppModel.createUser(req.con, req.body,function(err, user) {
      vardump(user)
      res.end(user.toString())
    })
  },

  getUserKey: function(req, res) {

    const username = req.body.username;

    AppModel.getUser(req.con, username, function(err, user) {

      if (user.length > 0) {

        user.forEach(function (user) {
          res.end(user.activation_key)
        })

      } else {
        res.end("false")
      }

    })
  },

  voteCheck: function(req, res) {
    const server_id = "5846";
    const player_ip = "82.142.2.177";
    //const player_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    fileGetContents('https://www.serveursminecraft.org/sm_api/peutVoter.php?id='+ server_id +'&ip=' + player_ip).then(json => {
      res.end(convertHMS(json))
    }).catch(err => {
      console.err(err.message);
    });

    function convertHMS(value) {
      const sec = parseInt(value, 10);
      let hours   = Math.floor(sec / 3600);
      let minutes = Math.floor((sec - (hours * 3600)) / 60);
      let seconds = sec - (hours * 3600) - (minutes * 60);
      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    }
  },

  getNewOrder: function(req, res) {
    ShopModel.getNewOrder(req.con,function(err, order) {
      res.end(JSON.stringify(order))
    })
  },

}