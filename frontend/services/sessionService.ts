import { ISession } from "@/types/sessionTypes";
import { TUserParticipant } from "@/types/userTypes";
import axios from "axios";

const API_BASE_URL = "https://jennet-obliging-duck.ngrok-free.app/api";

export const getUserSessions = async (userId: string): Promise<ISession[] | undefined> => {
	try {
		const response = await axios.get(`${API_BASE_URL}/sessions/user`, {
			params: { userId },
		});

		if (response.status === 200) {
			return response.data.sessions as unknown as ISession[];
		}
	} catch (error) {
		console.error(error);
	}
};

export const getAllSessions = async () => {
	try {
		const response = await axios.get(`${API_BASE_URL}/sessions/all`);

		if (response.status === 200) {
			return response.data.sessions;
		}
	} catch (error) {
		console.error(error);
	}
};

export const getSessionParticipants = async (
	sessionId: string
): Promise<TUserParticipant[] | undefined> => {
	try {
		const response = await axios.get(`${API_BASE_URL}/sessions/participants`, {
			params: { sessionId },
		});

		if (response.status === 200) {
			return response.data.participants.participants;
		}

		return undefined;
	} catch (error) {
		console.error(error);
	}
};

export const createSession = async (sessionData: object) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/sessions/create`, {
			data: sessionData,
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteSession = async (sessionId: string) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/sessions/delete`, {
			data: { sessionId },
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const joinSession = async (userId: string, sessionId: string) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/sessions/join`, {
			data: {
				userId,
				sessionId,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const leaveSession = async (participantId: string) => {
	try {
		const response = await axios.post(`${API_BASE_URL}/sessions/leave`, {
			data: { participantId },
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
};
