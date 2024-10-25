import { Request, Response } from "express";
import prisma from "../prismaInstance";

export const getAllSessions = async (req: Request, res: Response) => {
	try {
		const sessions = await prisma.session.findMany({
			orderBy: { date: "asc" },
			include: {
				creator: {
					select: { name: true, avatarUrl: true },
				},
				gym: {
					select: { name: true },
				},
				participants: true,
			},
		});

		if (!sessions) {
			return res.status(404).json({ message: "No sessions found" });
		}

		res.status(200).json({ message: "User sessions found", sessions });
	} catch (error) {
		console.error(`Error Getting User: ${error}`);
	}
};
export const getUserSessions = async (req: Request, res: Response) => {
	try {
		const { userId } = req.query as { userId: string };

		const userJoinedSessions = await prisma.sessionParticipant.findMany({
			where: {
				user_id: userId,
			},
			select: {
				session_id: true,
			},
		});

		const sessionIds = userJoinedSessions.map((session) => session.session_id);

		const sessions = await prisma.session.findMany({
			where: {
				session_id: {
					in: sessionIds,
				},
			},
			orderBy: { date: "asc" },
			include: {
				gym: { select: { name: true } },
				creator: { select: { name: true, avatarUrl: true } },
				participants: true,
			},
		});

		if (!sessions) {
			return res.status(404).json({ message: "No sessions found" });
		}

		return res.status(200).json({ message: "User sessions found", sessions });
	} catch (error) {
		console.error(error);
	}
};

export const getSessionParticipants = async (req: Request, res: Response) => {
	const { sessionId } = req.query as { sessionId: string };
	try {
		const participants = await prisma.session.findUnique({
			where: {
				session_id: sessionId,
			},
			select: {
				participants: {
					select: {
						user: { select: { avatarUrl: true, name: true } },
					},
				},
			},
		});

		if (!participants) {
			return res.status(404).json({ message: "No participants found" });
		}

		return res.status(200).json({ message: "Session Participants Found", participants });
	} catch (error) {
		console.error(`Error: Couldn't Fetch Session Participants: ${error}`);
	}
};

export const createSession = async (req: Request, res: Response) => {
	try {
		const {
			userId,
			gymId,
			sessionType,
			notes,
			date,
			skillLevel,
			maxParticipants,
			genderPreference,
		} = req.body.data;

		const newSession = await prisma.session.create({
			data: {
				creator: { connect: { user_id: userId } },
				gym: { connect: { gym_id: gymId } },
				type: sessionType,
				notes,
				date,
				skill_level: skillLevel,
				max_participants: maxParticipants,
				gender_pref: genderPreference,
				participants: { create: [{ user: { connect: { user_id: userId } } }] },
			},
		});

		if (!newSession) {
			return res.status(400).json({ message: "Session could not be created" });
		}

		console.log("New session created", newSession);
		res.status(201).json({ message: "Session created", newSession });
	} catch (error) {
		console.error(error);
	}
};

export const deleteSession = async (req: Request, res: Response) => {
	try {
		const { sessionId } = req.body.data;

		const deletedParticipants = await prisma.sessionParticipant.deleteMany({
			where: {
				session_id: sessionId,
			},
		});

		const deletedSession = await prisma.session.delete({
			where: {
				session_id: sessionId,
			},
		});

		// const transaction = await prisma.$transaction([
		//   deletedParticipants,
		//   deletedSession,
		// ]);

		if (!deletedSession) {
			return res.status(400).json({ message: "Session was unable to be deleted" });
		}

		console.log("Session deleted successfully", deletedSession);
		res.status(200).json({ message: "Session deleted", deleteSession });
	} catch (error) {
		console.error(error);
	}
};

export const joinSession = async (req: Request, res: Response) => {
	try {
		const { sessionId, userId } = req.body.data;

		const joinedSession = await prisma.sessionParticipant.create({
			data: {
				user: { connect: { user_id: userId } },
				session: { connect: { session_id: sessionId } },
			},
		});

		if (!joinedSession) {
			return res.status(400).json({ message: "User was unable to join session" });
		}

		console.log("User joined session", joinedSession);
		res.status(201).json({ message: "Joined session", joinedSession });
	} catch (error) {
		console.error(error);
	}
};

export const leaveSession = async (req: Request, res: Response) => {
	try {
		const { participantId } = req.body.data;

		const leftSession = await prisma.sessionParticipant.delete({
			where: { participant_id: participantId },
		});

		if (!leftSession) {
			return res.status(400).json({ message: "User was unable to leave session" });
		}

		console.log("User left session successfully");
		res.status(200).json({ message: "User left session successfully" });
	} catch (error) {
		console.error(error);
	}
};

export const createGym = async (req: Request, res: Response) => {
	const fakeGym = await prisma.gym.create({
		data: {
			name: "Depot Armley",
			address: " Unit 1, Maybrook Industrial Park, Armley Rd, Armley, Leeds",
			postcode: "LS12 2EL",
			description: "A bouldering gym in Leeds",
			openingHours: "10:00 - 22:00",
			contactNumber: "0113 345 3456",
			contactEmail: "abvc@depot.com",
			website: "https://www.depotclimbing.com/armley",
		},
	});

	if (!fakeGym) {
		return res.status(400).json({ message: "Gym could not be created" });
	}

	console.log(fakeGym);
	res.status(201).json({ message: "Gym created", fakeGym });
};

export const getGyms = async (req: Request, res: Response) => {
	const gyms = await prisma.gym.findMany();

	if (gyms.length === 0) {
		return res.status(404).json({ message: "No gyms found" });
	}

	res.status(200).json({ message: "Gyms found", gyms });
};
// Path
