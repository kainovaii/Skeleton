module.exports = {
    home: function(req, res) {
        const session = req.session;
        session.message = "";

        res.render("app", {view: 'home.ejs', session: session})
    },
}