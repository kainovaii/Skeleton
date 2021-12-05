const ShopModel = require("../model/ShopModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    home: function(req, res) {
        const session = req.session;

        ShopModel.getAllProducts(req.con,function (err, products) {
            res.render("app", {view: 'front/shop/home.ejs', products: products, session: session})
        })
    },


}