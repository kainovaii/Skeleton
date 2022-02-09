const AuhtModel = require("../model/AuthModel");
const bcrypt = require('bcryptjs');
const EmailService = require("../service/EmailService")

module.exports = {
    dashboard: function (req, res) {
        const session = req.session;
        session.message = "";

        res.render("app", {view: 'auth/home.ejs', session: session})
    },

    loginFront: function(req, res) {
        const session = req.session;
        const message = req.session.message;
        if (!session.userid)
        {
            res.render("app", {view: 'auth/login.ejs', message: message, session: session})
        } else {
            res.redirect("/auth/dashboard")
        }
    },

    loginReq: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const session = req.session;

        AuhtModel.getUserByEmail(req.con, email,function (err, user) {

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
                        session.message = "";

                        AuhtModel.getUserByID(req.con, session.userid,function (err, user) {
                            res.redirect("/auth/dashboard")
                        })

                        const data = {
                            subject: "title",
                            text: 'content',
                            email: user.email
                        }

                        EmailService.send(data)
                    } else {
                        req.session.message = "Mot de passe incorrect"
                        res.redirect("/auth/login")
                    }
                })
            } else {
                req.session.message = "Identifiant introuvable"
                res.redirect("/auth/login")
            }
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        res.redirect("/")
    },
}