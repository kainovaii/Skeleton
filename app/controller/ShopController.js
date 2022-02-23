const ShopModel = require("../model/ShopModel");
const vardump = require("@smartankur4u/vardump")

module.exports = {
    standardVPS: function(req, res) {
        const session = req.session;

        ShopModel.getAllProducts(req.con,function (err, products) {
            res.render("app", {view: 'front/product/bare_cloud_standard_vps.ejs', products: products, session: session})
        })
    },

    windowsVPS: function(req, res) {
        const session = req.session;

        ShopModel.getAllProducts(req.con,function (err, products) {
            res.render("app", {view: 'front/product/bare_cloud_windows_vps.ejs', products: products, session: session})
        })
    },

    add: function(req, res) {
        const session = req.session;
        const product_id = req.params.id;

        ShopModel.getProductID(req.con, product_id,function (err, product) {
            product.forEach(function (product) {
                req.session.cart = null;
                req.session.cart = {
                    product_id: product.id,
                    product_name: product.name,
                    product_type: product.type,
                    product_price: product.price,
                    product_core: product.core,
                    product_memory: product.memory,
                    product_disk: product.disk,
                    product_bandwidth: product.bandwidth,
                    product_category: product.type,
                }
                res.redirect("/fr/produits/configuration");
            })
        })
    },

    config_index: function(req, res) {
        const session = req.session;
        const cart = req.session.cart

        ShopModel.getAllProductsByCategory(req.con, cart.product_category,function (err, products) {
            res.render("app", {view: 'front/product/cart.ejs', session: session, cart: cart, product_list: products})
        })
    },
}