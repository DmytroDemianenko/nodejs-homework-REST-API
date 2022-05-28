// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'demianenkodmytro@meta.ua',
//     pass: META_PASSWORD,
//   },
// };
// const transporter = nodemailer.createTransport(nodemailerConfig);
// const mail = {
//   to: 'demianenkodmytro2205@gmail.com',
//   from: 'demianenkodmytro@meta.ua',
//   subject: 'New mail from site',
//   html: '<h2>New order from our shop</h2>',
// };
// transporter
//   .sendMail(mail)
//   .then(() => console.log('Email sended successful'))
//   .catch(error => console.log(error.message));
// const sendMail = async data => {
//   try {
//     const mail = { ...data, from: 'dmytrodemianenko@gmail.com' };
//   } catch (error) {}
// };
// module.exports = sendMail;
