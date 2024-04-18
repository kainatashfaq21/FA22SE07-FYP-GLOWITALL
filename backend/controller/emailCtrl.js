const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MP, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hey 👻" <abc@gmail.com.com>', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line

    html: `
                  <h2>Reset Password Link</h2>
                  <p>Dear user,</p>
                  <p>You have requested to reset your password. Please use the following Linkto proceed:</p>
                  <h3>${data.html}</h3>
                  <p>This link is valid for a limited time. Please do not share it with anyone.</p>
                  <p>If you didn't request a password reset, please ignore this email.</p>
                  <p>Thank you,</p>
                  <p>gLOW IT ALL</p>
                `,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = sendEmail;
