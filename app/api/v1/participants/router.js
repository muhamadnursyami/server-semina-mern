const express = require("express");
const router = express();
const {
  signup,
  activeParticipant,
  signin,
  getAllEventsLandingPage,
  getDetailsEventsLandingPage,
} = require("./controller");

router.post("/auth/signup", signup);
router.put("/active", activeParticipant);
router.post("/auth/signin", signin);
router.get("/events", getAllEventsLandingPage);
router.get("/events/:id", getDetailsEventsLandingPage);
module.exports = router;
