const express = require("express");
const router = express();
const { signup, activeParticipant, signin } = require("./controller");

router.post("/auth/signup", signup);
router.put("/active", activeParticipant);
router.post("/auth/signin", signin);
module.exports = router;
