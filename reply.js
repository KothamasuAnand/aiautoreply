const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

exports.sendMail=async (recipientMail,body,sub)=> {
  const e = process.env;
  const oAuth2Client = new google.auth.OAuth2(
    e.CLIENT_ID,
    e.CLIENT_SECRET,
    e.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: e.REFRESH_TOKEN });
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kothamasuanand503@gmail.com",
        clientId: e.CLIENT_ID,
        clientSecret: e.CLIENT_SECRET,
        refreshToken: e.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "Reachinbox <kothamasuanand503@gmail.com>",
      to: recipientMail,
      subject: sub,
      text: body,
    };

    try {
      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
}
