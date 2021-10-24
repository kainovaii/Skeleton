const AppModel = require("../model/AppModel");
const bcrypt = require('bcryptjs');
const vardump = require("@smartankur4u/vardump")

module.exports = {
    login: function(req, res) {


        if (req.session.userid)
        {
            res.redirect('/manager')
        } else {
            res.render('front/login.ejs')
        }

    },

    login2: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        AppModel.getUser(req.con, email,function (err, user) {

            user.forEach(function (user) {
                if (bcrypt.compareSync(password, user.password) === true)
                {
                    req.session.userid = user.id
                    res.redirect("/manager")
                } else {
                    res.redirect("/manager")
                }
            })
        })
    },

    logout: function(req, res) {
        req.session.destroy()
        res.redirect("/manager")
    },
}