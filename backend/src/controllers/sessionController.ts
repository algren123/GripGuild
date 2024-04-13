import { Request, Response } from "express";
import prisma from "../prismaInstance";

export const getUserSessions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query as { userId: string };

    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        sessions: {
          include: { creator: { select: { name: true } } },
        },
      },
    });

    const sessions = user?.sessions;

    console.log(sessions);

    if (!sessions) {
      return res.status(404).json({ message: "No sessions found" });
    }

    res.status(200).json({ message: "User sessions found", sessions });
  } catch (error) {
    console.error(error);
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const session = req.body.data;

    const {
      userId,
      gymId,
      sessionType,
      notes,
      date,
      skillLevel,
      maxParticipants,
      genderPreference,
    } = session;

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

export const createGym = async (req: Request, res: Response) => {
  const fakeGym = await prisma.gym.create({
    data: {
      name: "Depot Armley",
      location: "Armley, Leeds",
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
