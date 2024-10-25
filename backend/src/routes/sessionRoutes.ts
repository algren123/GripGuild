/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const {
	getAllSessions,
	getUserSessions,
	getSessionParticipants,
	createSession,
	deleteSession,
	joinSession,
	leaveSession,
	createGym,
	getGyms,
} = require("../controllers/sessionController");

const router = express.Router();

// Define routes
router.get("/all", getAllSessions);
router.get("/user", getUserSessions);
router.get("/participants", getSessionParticipants);
router.post("/create", createSession);
router.post("/join", joinSession);
router.post("/leave", leaveSession);
router.post("/delete", deleteSession);
router.post("/gym", createGym);
router.get("/gyms", getGyms);

export default router;
