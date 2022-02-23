const vardump = require("@smartankur4u/vardump");
const paypal = require("paypal-rest-sdk");
const ServiceService = require("../service/ServiceService");
const UrlService = require("../service/UrlService");
const AppModel = require("../model/UserModel");
const TransactionModel = require("../model/TransactionModel");

paypal.configure({
    'mode': process.env.PAYPAL_ENV,
    'client_id': process.env.PAYPAL_ID,
    'client_secret': process.env.PAYPAL_SECRET
});

module.exports = {
    home: function(req, res) {
        const product_price = req.body.product_price;
        const product_name = req.body.product_name;

        const data = {
            name: 'Univers Cloud - VPS Standard',
            address: '192.168.0.23',
            deadline: '2022-01-09',
            price: '1.99',
            userid: '1'
        }

        ServiceService.create(req, data)

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://" + process.env.APP_DOMAIN + "/fr/produits/success",
                "cancel_url": "http://" + process.env.APP_DOMAIN + "/fr/produits/failed"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": product_name,
                        "sku": "001",
                        "price": product_price,
                        "currency": "EUR",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "EUR",
                    "total": product_price
                },
                "description": "§!§!§!§!"
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length;i++){
                    if(payment.links[i].rel === 'approval_url'){
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
    },

    failed: function(req, res) {
        const session = req.session;

        const search = UrlService.getParams(req.url);

        const data = {
            token: search.get('token'),
            paymentId: "null",
            PayerID: "null",
            status: 0,
            username: session.username
        }

        if (search.get('token')) {
            TransactionModel.create(req.con, data)
            res.redirect("/fr/produits/failed");
        } else {
            res.render("app", {view: 'front/payment/failed.ejs', session: session})
        }
    },

    success: function(req, res) {
        const session = req.session;
        const search = UrlService.getParams(req.url);

        const data = {
            token: search.get('token'),
            paymentId: search.get('paymentId'),
            PayerID: search.get('PayerID'),
            status: 1,
            username: session.username
        }

        if (search.get('token')) {
            TransactionModel.create(req.con, data)
            res.redirect("/fr/produits/failed");
        } else {

            res.render("app", {view: 'front/payment/success.ejs', session: session})
        }
    },
}