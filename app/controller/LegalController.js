const ShopModel = require("../model/ShopModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    legal_mentions: function(req, res) {
        const session = req.session;

        res.render("app", {view: 'front/legal/legal_mentions.ejs', session: session})
    },

}