const AppModel = require("../model/UserModel")

module.exports = function (req, res, next) {
    const client_id = req.session.userid;

    if (client_id) {
        AppModel.getUserID(req.con, client_id,function (err, user) {
            user.forEach(function (user) {
                if (user.status === 1) {
                    return next();
                } else {
                    res.redirect('/activation');
                }
            })
        })
    } else {
        res.redirect('/connexion');
    }
};