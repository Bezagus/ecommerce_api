const nodemailer = require('nodemailer');
const { NODEMAILER_EMIAL, NODEMAILER_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: `${NODEMAILER_EMIAL}`, 
    pass: `${NODEMAILER_PASSWORD}`
  }
});

module.exports = transporter
