const Participant = require("../../api/v1/participants/model");
const Events = require("../../api/v1/event/model");
const Orders = require("../../api/v1/orders/model");
const Payments = require("../../api/v1/payments/model");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../../errors");
const { createJWT, createTokenParticipant } = require("../../utils");

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
  delete result._doc.otp; // menghapus otp agar tidak nampil.

  return result;
};

// Login Participants
const signinParticipants = async (req) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result = await Participant.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  if (result.status === "tidak aktif") {
    throw new UnauthorizedError("Akun anda belum aktif");
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

// kita mau ambil event yang status nya itu publish
const getAllEvents = async (req) => {
  // jadi maksudnya kita akan ambil event yang statusnya published, kemudian kita hanya ambil
  // categorynya dan image, setelah itu kita ambil semua, berupa id title date tickets venueName
  const result = await Events.find({ statusEvent: "Published" })
    .populate("category")
    .populate("image")
    .select("_id title date tickets venueName");
  return result;
};

const getDetailEvent = async (req, res, next) => {
  const { id } = req.params;
  const result = await Events.findOne({ _id: id })
    .populate("category")
    .populate("talent")
    .populate("image");
  if (!result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`);

  return result;
};

const getAllOrder = async (req) => {
  console.log(req.participant);
  // ambil order pada participants yang login
  const result = await Orders.find({ participant: req.participant.id });
  return result;
};

module.exports = {
  signupParticipant,
  activateParticipant,
  signinParticipants,
  getAllEvents,
  getDetailEvent,
  getAllOrder,
};
