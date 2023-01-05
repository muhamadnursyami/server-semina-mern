const express = require("express");
const router = express();
const { createCMSOrganizer, createCMSUser, getAll } = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.post(
  "/organizers",
  authenticateUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);
router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser
);
router.get("/users", authenticateUser, authorizeRoles("owner"), getAll);
module.exports = router;
