module.exports = {
    checkPower: function(req, res, next) {

        if (req.session.power >= 100)
            return next();

        res.redirect('/fr/espace-client');
    },
};