const AppModel = require("../model/AuthModel")

module.exports = function (req, res, next) {
    const userid = req.session.userid;

    if (userid) {
        AppModel.getUserID(req.con, userid,function (err, user) {
            user.forEach(function (user) {
                if (user.status === 1) {
                    return next();
                } else {
                    res.redirect('/auth/dashboard');
                }
            })
        })
    } else {
        res.redirect('/auth/login');
    }



};