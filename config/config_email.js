const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'testermohali@gmail.com',
        pass: 'esfera123',
    },
});

module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: 'info@brewpub.com',
        to,
        subject,
        html: message
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};