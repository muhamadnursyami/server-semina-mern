const express = require("express");
const router = express();
const { create, getAll, destroy, getOne, update } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get("/payments", authenticateUser, authorizeRoles("organizer"), getAll);
router.get(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  getOne
);
router.put(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/payments/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);
router.post("/payments", authenticateUser, authorizeRoles("organizer"), create);

module.exports = router;
