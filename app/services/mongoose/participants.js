const Participant = require("../../api/v1/participants/model");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");

const { otpMail } = require("../mail");

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  // jika email dan status tidak aktif
  let result = await Participant.findOne({
    email,
    status: "tidak aktif",
  });
  //jika true maka kita akan mengupdate, tujuan nya biar emialnya tidak terdaftar, logika untuk
  // ngecek apakah email ini ada di database, jika ada dan status nya tidak aktif, maka kita akan kirim kode otp ulang
  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999); // kode otpnya random 4 digit.
    await result.save();
  } else {
    result = await Participant.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }
  await otpMail(email, result);
  // menghapus passwordnya, supaya passwordnya tidak nampil dan otpnya juga
  delete result._doc.password;
  delete result._doc.otp;

  return result;
};

const activateParticipant = async (req) => {
  const { otp, email } = req.body;
  const check = await Participant.findOne({
    email,
  });

  if (!check) throw new NotFoundError("Partisipan belum terdaftar");

  if (check && check.otp !== otp) throw new BadRequestError("Kode otp salah");

  // kemudian kita ambil berdasarkan idnya,dengan cara lain nya yaitu : check._id , terus kita update statusnya
  // menjadi aktif
  const result = await Participant.findByIdAndUpdate(
    check._id,
    {
      status: "aktif",
    },
    { new: true } // untuk mengubah status nya secara real time, jika tidak mempan, pada saat tidak menggunakan ini.
  );

  delete result._doc.password; // menghapus password agar tidak nampil.

  return result;
};

module.exports = { signupParticipant, activateParticipant };
