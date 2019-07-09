const nodemailer = require('nodemailer');
const { successResponse, errorsResponse } = require('./responseFormatter.js');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_ID,
    clientSecret: process.env.MAIL_SECRET,
    refreshToken: process.env.MAIL_REFRESH
  }
});

module.exports = {
  sendEmail(mail) {
    transport.sendMail(mail)
      .then(data => {
        console.log(successResponse(data));
      })
      .catch(err => {
        console.log(errorsResponse(err));
      });
  },

  format(rec, sub, data) {
    return {
      from: 'Fikri <FikriRNurhidayat@gmail.com>',
      to: rec,
      subject: sub,
      html: data
    }
  },

  confirmation(data, link) {
    return "<h5>Hello, " + data.name + "!</h5>"+"<br>"+"<p>Please do confirm your email address! In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.</p>"+`<a href="`+`${process.env.URL}/api/users/confirm/${link}`+`">Click here to confirm!</a>`
  },

  confirmed() {
    return "<p>Thanks for your confirmation!</p>"
  }
}
