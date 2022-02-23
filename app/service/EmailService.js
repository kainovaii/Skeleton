const SMTPClient = require("emailjs");
require("dotenv").config();

const server = SMTPClient.server.connect({
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    host: process.env.SMTP_HOST,
    ssl: true,
});

module.exports = {
    send: function (data) {
        server.send(
            {
                text: data.text,
                from: "Service Client LayCloud <hello@laycloud.eu>",
                to: data.email,
                subject: data.subject,
            },
            function(err, message) {
                //console.log(err || message);
            }
        );
    }
};