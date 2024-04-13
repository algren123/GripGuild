const express = require("express");
const {
  signup,
  getUserProfile,
  editUserProfile,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Define routes
router.post("/signup", signup);
router.post("/edit", editUserProfile);
router.get("/profile", getUserProfile);
router.delete("/delete", deleteUser);

export default router;
