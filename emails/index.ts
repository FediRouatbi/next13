import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
export const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "fedirouatbi@gmail.com",
      pass: "beymdkzjlibpddog",
    },
  })
);
