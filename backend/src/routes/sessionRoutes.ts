const express = require("express");
const {
  getUserSessions,
  createSession,
  createGym,
  getGyms,
} = require("../controllers/sessionController");

const router = express.Router();

// Define routes
router.get("/user", getUserSessions);
router.post("/create", createSession);
router.post("/gym", createGym);
router.get("/gyms", getGyms);

export default router;
