const express = require("express");
const router = express();
const {
  create,
  getAll,
  findIdIndex,
  update,
  deleteCategory,
} = require("./controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");

router.get(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  getAll
);
router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  findIdIndex
);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  deleteCategory
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  create
);
module.exports = router;
