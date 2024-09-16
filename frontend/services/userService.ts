import axios from "axios";

const API_BASE_URL = "https://jennet-obliging-duck.ngrok-free.app/api/users";

export const getUser = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      params: { email },
    });

    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};

export const checkExistingUser = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      params: { email },
    });

    return !!response.data.user;
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (user: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {
      email: user.email,
      name: user.name,
      providerId: user.id,
      avatarUrl: user.photo,
    });

    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};
