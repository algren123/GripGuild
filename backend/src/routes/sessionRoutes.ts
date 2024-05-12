const express = require("express");
const {
  getAllSessions,
  getUserSessions,
  createSession,
  leaveSession,
  createGym,
  getGyms,
} = require("../controllers/sessionController");

const router = express.Router();

// Define routes
router.get("/all", getAllSessions);
router.get("/user", getUserSessions);
router.post("/create", createSession);
router.delete("/leave", leaveSession);
router.post("/gym", createGym);
router.get("/gyms", getGyms);

export default router;
