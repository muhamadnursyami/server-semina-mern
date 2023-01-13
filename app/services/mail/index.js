const nodemailer = require("nodemailer"); // untk menggunakan email otp
const { gmail, password } = require("../../config");
const Mustache = require("mustache"); // untuk merender html di otp
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

// nah, parameter dari otMail, yang berupa email, data, adalah didapat dari mongoose participants,
// yang sudah di export module, jadi sih function ini bisa dapat menggunakannya
// isi dari email adalaha email yang mendaftar, dan data adalah hasil dari varibale result
// berupafirstName,lastName,email,password,role,otp.
const otpMail = async (email, data) => {
  try {
    // ngerender filenya, supaya bisa di baca
    let template = fs.readFileSync("app/views/email/otp.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Otp for registration is: ",
      html: Mustache.render(template, data), // ini templatenya iyalah file html, dan data adalah dari monggose participan
    };
    // kemudian email dari variabel diatas di kirim ke email yang mendaftar.
    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};
const orderMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/order.html", "utf8");

    let message = {
      from: gmail,
      to: email,
      subject: "Data Transaksi Anda : ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail, orderMail };
