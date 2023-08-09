const express = require("express");
const router = express();
const {
  signup,
  activeParticipant,
  signin,
  getAllEventsLandingPage,
  getDetailsEventsLandingPage,
  getAllDashboard,
  Checkout,
  buktiTransaksi,
  getAllPayment,
} = require("./controller");

// jadi sebelum menjalankan fungsi getAllDashboar,
// kita harus ngecek terlebih dahulu, bahwa yang bisa getAllOrder adalah
// Participantsnya. tidak bisa yang lain
const { authenticateParticipant } = require("../../../middlewares/auth");
router.post("/auth/signup", signup);
router.put("/active", activeParticipant);
router.post("/auth/signin", signin);
router.get("/events", getAllEventsLandingPage);
router.get("/orders", authenticateParticipant, getAllDashboard);
router.post("/checkout", authenticateParticipant, Checkout);
router.get("/events/:id", getDetailsEventsLandingPage);
router.get("/payments/:organizer", authenticateParticipant, getAllPayment);

module.exports = router;
