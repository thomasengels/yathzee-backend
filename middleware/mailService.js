var nodemailer = require('nodemailer');
var smtpTransport = require("nodemailer-smtp-transport");

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 465,
    auth: {
        user: "thomas.engels92@gmail.com",
        pass: "CMscout92&&"
    }
}));

exports.sendMail = function(to, from) {
	var html = getHtmlForYathzee(to, from);

    var mailOptions = {
        from: '"Thomas Engels" <thomas.engels92@gmail.com>', // sender address
        to: "thomas.engels92@gmail.com", // list of receivers
        subject: 'yathzee uitnodiging', // Subject line
        html: '<b>' + html + '</b>' // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
};

function getHtmlForYathzee(to, from){
	return '<body><p>' + to.firstname + '</p>' +
	'<p>' + from.firstname + ' Heeft je uitgenodigd voor een spelletje yathzee. </p><p> Ga naar de website om zijn/haar uitnodiging te accepteren.</p>' +
	'<p>Met vriendelijke groeten Thomas </p></body>';
}
