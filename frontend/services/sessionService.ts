import axios from "axios";

const API_BASE_URL = "https://06e2-94-8-169-223.ngrok-free.app/api";

export const getUserSessions = async (userId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions/user`, {
      params: { userId },
    });

    return response.data.sessions;
  } catch (error) {
    console.error(error);
  }
};

export const createSession = async (sessionData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sessions/create`, {
      data: sessionData,
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
