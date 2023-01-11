const express = require("express");
const router = express();
const {
  signup,
  activeParticipant,
  signin,
  getAllEventsLandingPage,
  getDetailsEventsLandingPage,
  getAllDashboard,
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
module.exports = router;
