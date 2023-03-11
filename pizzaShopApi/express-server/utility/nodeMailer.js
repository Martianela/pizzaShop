const nodemailer = require("nodemailer");

module.exports.sendEmail = async function sendEmail(str, data) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: "rishu2207soni@gmail.com",
        pass: "qfvhibqayyqihyie",
      },
    });
    var Osubject, Ohtml;
    if (str == "signup") {
      Osubject = `thankyou for signing up ${data.name}`;
      Ohtml = `
      <h1>Welcome to the foodApp.com</h1>
      Hope you have a good time
      here os your deatil:
      Name:${data.name}
      Email:${data.email}`;
    } else if (str == "forgetPassword") {
      Osubject = "Reset Password ";
      Ohtml = `
      <h1>foodApp</h1>
      hare is your reset password Link:
      ${data.resetPasswordLink}`;
    }
    let info = await transporter.sendMail({
      from: '"foodApp" <rishu2207soni@gmail.com>', // sender address
      to: `${data.email}`, // list of receivers
      subject: Osubject, // Subject line
      html: Ohtml, // html body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error.message);
  }
};
