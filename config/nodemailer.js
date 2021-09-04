const nodemailer = require("nodemailer");
const nodemailerSMTPTransport = require("nodemailer-smtp-transport");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bellaclothes5@gmail.com",
        pass: "b90cl12llo"
    }
});
module.exports = smtpTransport;