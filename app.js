const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

console.log(process.env.emailaddress);

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false, // use SSL
  auth: {
    user: "nmuthukumaranm@gmail.com",
    pass: "onfupjueyjasgbzx",
  },
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("this is an email service");
});

app.post("/update", function (req, res) {
  const { name, number, email, subject, message } = req.body;
  console.log("testing---1", req.body);

  transporter.sendMail(
    {
      from: "portfolio",
      to: "nmuthukumaranm@gmail.com",
      subject: `${name} tried contacting you...`,
      text: `Hi Sathya, you received email from portfolio. Below are the details
      name: ${name},
      contact: ${number},
      email: ${email},
      subject: ${subject},
      message: ${message}
      `,
    },
    function (error, info) {
      console.log("testing---2");
      if (error) {
        console.log("email err", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
  res.sendFile(path.join(__dirname, "/feedback.html"));
});

app.listen(3000, () => {
  console.log(`server listening on port 3000`);
});
