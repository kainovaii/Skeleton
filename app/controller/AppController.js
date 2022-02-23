const AppModel = require("../model/UserModel");
const bcrypt = require('bcryptjs');
const vardump = require("@smartankur4u/vardump")
const EmailService = require("../service/EmailService")
const WalletModel = require("../model/WalletModel")

module.exports = {

    loginFront: function(req, res) {
        if (req.session.userid)
        {
            AppModel.getUserID(req.con, req.session.userid,function (err, user) {
                res.render("app", {view: 'manager/login.ejs', data: user})
            })
        } else {
            const message = req.session.message;
            res.render('manager/login.ejs', {message: message})
        }
    },

    loginReq: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const session = req.session;

        AppModel.getUser(req.con, email,function (err, user) {

            if (user.length > 0) {
                user.forEach(function (user) {
                    if (bcrypt.compareSync(password, user.password) === true)
                    {
                        session.userid = user.id
                        session.fname = user.fname
                        session.lname = user.lname
                        session.username = user.username
                        session.email = user.email
                        session.power = user.power
                        session.company = user.company
                        session.tax_id = user.tax_id
                        session.address1 = user.address1
                        session.address2 = user.address2
                        session.city = user.city
                        session.state = user.state
                        session.postcode = user.postcode
                        session.country = user.country
                        session.message = "";

                        WalletModel.getByUser(req.con, session.username,function (err, user) {
                            if (!user.length > 0)
                            {
                                data = {
                                    username: session.username
                                }

                                WalletModel.create(req.con, data)
                                session.solde = 0
                                res.redirect("/fr")
                            }
                            user.forEach(function (user) {
                                session.solde = user.solde
                                res.redirect("/fr")
                            })
                        })

                        let data = {
                            subject: "Notification de connexion à votre compte",
                            text: 'Bonjour, \n\n Nous détectons une nouvelle adresse IP lors de la connexion a votre compte. 2a01:e0a:4bd:8120:e1e8:5603:1f87:6c74 \n\n Cordialement, \n LayCloud',
                            email: user.email
                        }

                        EmailService.send(data)
                    } else {
                        req.session.message = "Mot de passe incorrect"
                        res.redirect("/fr/espace-client")

                    }
                })
            } else {
                req.session.message = "Identifiant introuvable"
                res.redirect("/fr/espace-client")
            }


        })
    },

    activation: function(req, res) {
        res.render("manager/activation")
    },

    activationReq: function(req, res) {
        const session = req.session;
        const password = req.body.password
        const password2 = req.body.password2
        const activation_key = req.body.activation_key

        if (!req.session.userid)
        {
            AppModel.getUserByKey(req.con, activation_key,function (err, user) {
                user.forEach(function (user) {
                    if (user.status === "1")
                    {
                        res.redirect("/fr/espace-client")
                    }
                    if (password === password2)
                    {
                        bcrypt.hash(password, 10, function(err, hash) {
                            AppModel.updateUserPass(req.con, hash, user.id, function (err, user) {
                                req.session.message = "Your account has been activate"
                                res.redirect("/fr/espace-client/connexion")
                                vardump(err)
                            })
                        });
                    }
                })
            })

        } else {
            AppModel.getUserID(req.con, req.session.userid,function (err, user) {
                res.render("app", {view: 'front/account/bare_cloud_standard_vps.ejs', data: user, session: session})
            })
        }
    },

    updateUser: function(req, res) {
        const session = req.session;

        const data = {
            id: session.userid,
            company: req.body.company,
            tax_id: req.body.tax_id,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            postcode: req.body.postcode,
            country: req.body.country,
        }

        AppModel.updateUser(req.con, data,function (err, user) {
            session.company = req.body.company
            session.tax_id = req.body.tax_id
            session.address1 = req.body.address1
            session.address2 = req.body.address2
            session.city = req.body.city
            session.state = req.body.state
            session.postcode = req.body.postcode
            session.country = req.body.country

            res.redirect("/fr/espace-client/mon-compte")
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        res.redirect("/fr")
    },
}