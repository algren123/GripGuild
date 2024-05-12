import { ISession } from "@/types/sessionTypes";
import axios from "axios";

const API_BASE_URL = "https://19f4-94-8-169-223.ngrok-free.app/api";

export const getUserSessions = async (
  userId: string
): Promise<ISession[] | undefined> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions/user`, {
      params: { userId },
    });

    console.log(response.data);

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

export const createSession = async (sessionData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sessions/create`, {
      data: sessionData,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const leaveSession = async (participantId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/sessions/leave`, {
      data: participantId,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
