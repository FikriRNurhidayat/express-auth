const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const { successResponse, errorsResponse } = require('./responseFormatter.js');

const option = {
  auth: {
    api_key: "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"
  }
}

const client = nodemailer.createTransport(sgTransport(option));

module.exports = {
  sendEmail(mail) {
    client.sendMail(mail)
      .then(data => {
        console.log(successResponse(data));
      })
      .catch(err => {
        console.log(errorsResponse(err));
      });
  },

  format(rec, sub, data) {
    return {
      from: 'express.auth@mail.com',
      to: rec,
      subject: sub,
      html: data
    }
  },

  confirmation(data, link) {
    return `<h5>Hello ${data.name}<h5>`+`<p>Please do confirm your email address! In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.<p>`+`<a href="http://localhost:8000/api/users/confirm/${link}">Click here to confirm!</a>`
  },

  confirmed() {
    return "<p>Thanks for your confirmation!</p>"
  }
}
