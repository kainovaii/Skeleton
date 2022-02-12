const EmailService = require("../service/EmailService");

module.exports = {
    home: function(req, res) {
        const session = req.session;
        session.message = "";

        res.render("app", {view: 'front/home.ejs', session: session})
    },

    clientarea: function(req, res) {
        const session = req.session;
        session.message = "";

        res.render("app", {view: 'front/client/home.ejs', session: session})
    },

    sentSMS: function(req, res) {

        const accountSid = "AC8ba1517b5bb5f5087e563d777223e7cc";
        const authToken = "ec4fbe53fd2bbd6f9fd0a99d1d59366c";
        const client_msg = require('twilio')(accountSid, authToken);

        client_msg.messages
            .create({
                body: 'test',
                messagingServiceSid: 'MGe9d3c8b94692e15a3cf51fd113991d1e',
                to: '+33756950468'
            })
            .then(message => console.log(message.sid)).done();
    },

    sentMail: function(req, res) {


    },


}