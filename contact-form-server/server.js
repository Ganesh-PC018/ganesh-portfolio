const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// const nodemailer = require("nodemailer");
// require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP error:", error);
  } else {
    console.log("SMTP configuration is good to go!");
  }
});


app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br>${message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: 'Email sent successfully!' });

  } catch (error) {
    console.error("Failed to send email:", error); // <-- Add this line
    res.status(500).json({ message: 'Email sending failed.' });
  }
});
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
