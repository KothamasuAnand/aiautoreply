var axios = require("axios");
var qs = require("qs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

// exports.getToken = async (next) => {
//   var data = qs.stringify({
//     client_id: `${process.env.CLIENT_ID}`,
//     client_secret: `${process.env.CLIENT_SECRET}`,
//     refresh_token:`${process.env.REFRESH_TOKEN}`,
//     grant_type: "refresh_token",
//   });
//   var config = {
//     method: "post",
//     url: "https://accounts.google.com/o/oauth2/token",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: data,
//   };

//   try {
//     const res = await axios(config);
//     const token = res.data.access_token;
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.getList = async (token) => {
  var config1 = {
    method: "get",
    url: "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&labelIdsToAdd=UNREAD,IMPORTANT,CATEGORY_PERSONAL,INBOX",
    headers: {
      Authorization: `Bearer ${token} `,
    },
  };
  var threadId = "";
  await axios(config1)
    .then(async function (response) {
      var list = [];
      threadId = await response.data["messages"];
    })
    .catch(function (error) {
      console.log(error);
    });
  return threadId;
};

exports.getContent = async (threadId, token) => {
  var config = {
    method: "get",
    url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadId}`,
    headers: {
      Authorization: `Bearer ${await token}`,
    },
  };

  var content = {};

  await axios(config)
    .then(async function (response) {
      content = await response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return content;
};

exports.getDecodedMsg = async (encodedMsg) => {
  return Buffer.from(encodedMsg, "base64").toString("ascii");
};

exports.getSenderMail = async (headers) => {
  const senderEmail = headers.find(
    (header) => header.name === "Return-Path"
  ).value;
  var sn = senderEmail.length;
  const ns = senderEmail.slice(1, sn - 1);
  return ns;
};

exports.getToken = async (next) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  try{
    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken.token;
  }catch(err){
    console.log(err);
  }
};
