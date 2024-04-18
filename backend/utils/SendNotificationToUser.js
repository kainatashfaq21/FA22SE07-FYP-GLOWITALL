const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendNotificationToUser = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MP,
    },
  });
  if (!data.user.email) {
    console.error(`No email address found for user ${data.user.email}`);
    return;
  }
  let info = await transporter.sendMail({
    from: '"Hey 👻" <abc@gmail.com.com>',
    to: data.user.email,
    subject: "Exciting Update on Your Wishlist",
    html: `<h2>Dear ${data.user.firstname} ${data.user.lastname}</h2>
    <p>We're thrilled to let you know that the product you added to your wishlist has been updated with exciting new features. Get ready to experience the enhanced version!</p>
    <p>Please check the updated details and place your order now:</p>
    <a href="http://localhost:3000/product/${data.updatedProduct._id}" style="display:inline-block;background-color:#4CAF50;color:#fff;padding:10px 20px;text-decoration:none;">Explore Now</a>
    <p>Don't miss out on this amazing opportunity. Visit our website and discover more high-quality products.</p>
    <p>Thank you for choosing GLOW IT ALL,</p>
    <p>The GLOW IT ALL Team</p>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = sendNotificationToUser;
