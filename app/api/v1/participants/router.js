const express = require("express");
const router = express();
const { signup, activeParticipant } = require("./controller");

router.post("/auth/signup", signup);
router.put("/active", activeParticipant);
module.exports = router;
