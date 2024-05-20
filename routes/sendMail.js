const nodemailer = require("nodemailer");

const sendMail = async (email, random) => {

  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "ananya08agrawal@gmail.com",
        pass: "ckfk zzrx ajny iizc",
      },
    });

    let mailOptions = {
      from: {
        name: "Team Autho",
        address: email
      }, //sender address
      to: [email], // list of receivers
      subject: "OTP for Autho", // Subject line
      text: `OTP to login in the website ${random}`, // plain text body
      html:`<body>
        <p>Hello,</p>
        <p>This is your OTP to login to Autho: <strong>${random}</strong></p>
        <p>Please don't share with anyone</p>
        <p>Regards,</p>
        <p>Team Autho</p>
      </body>`, // html body
      // attachments
    }
    
    let info = await transporter.sendMail(mailOptions);
    return {info};
  } catch (error) {
    console.error("Error sending mail:", error);
    return { error: "Error sending mail" };
  }
}

module.exports = sendMail