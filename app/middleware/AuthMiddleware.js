const AppModel = require("../model/AppModel")

module.exports = function (req, res, next) {
    const client_id = req.session.userid;

    if (client_id) {
        AppModel.getUserID(req.con, client_id,function (err, user) {
            user.forEach(function (user) {
                if (user.status === 1) {
                    return next();
                } else {
                    res.redirect('/fr/espace-client/activation');
                }
            })
        })
    } else {
        res.redirect('/fr/espace-client/connexion');
    }



};