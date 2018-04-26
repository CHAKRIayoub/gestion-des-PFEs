var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ay.chakri@gmail.com',
    pass: 'ayoub1996'
  }
});

module.exports = transporter