// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   // 1) create a transporter
//   // const transporter = nodemailer.createTransport({
//   //   host: process.env.EMAIL_HOST,
//   //   port: process.env.EMAIL_PORT,
//   //   auth: {
//   //     user: process.env.EMAIL_USERNAME,
//   //     pass: process.env.EMAIL_PASSWORD,
//   //   },
//   // });

//   console.log(options.email);

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // 2) define the email options
//   const mailOptions = {
//     from: 'shreyapainter1305@gmail.com',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   // 3) actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    console.log('📧 Sending to:', options.email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log('✅ EMAIL_USER:', process.env.EMAIL_USER);
    console.log('✅ EMAIL_PASS:', process.env.EMAIL_PASS);

    const mailOptions = {
      from: 'shreyapainter1305@gmail.com',
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send email:', err); // LOG THE REAL ERROR
  }
};

module.exports = sendEmail;
