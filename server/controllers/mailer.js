const nodemailer = require('nodemailer')

exports.mailer = (sender, receiver, subject, body) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
        
        const options = {
            from: sender,
            to: receiver,
            subject: subject,
            html: body
        };
        
        
        transporter.sendMail(options, (err, info) => {
            if(err) {
                reject(err)
            }
            resolve()
        })
    });
}
