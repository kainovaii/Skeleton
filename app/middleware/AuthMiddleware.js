const AuthModel = require("../model/AuthModel")

module.exports = function (req, res, next) {
    const userid = req.session.userid;

    if (userid) {
        AuthModel.getUserByID(req.con, userid,function (err, user) {
            user.forEach(function (user) {
                if (user.status === 1) {
                    return next();
                } else {
                    req.session.message = "Account not activate";
                    res.redirect('/auth/login');
                }
            })
        })
    } else {
        res.redirect('/auth/login');
    }
};