module.exports = {
    checkEmpty: function(req, res, next) {
        if (req.session.cart)
            return next();

        res.redirect('/');
    },
};