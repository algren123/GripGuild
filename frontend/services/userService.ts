import axios from 'axios';

const API_BASE_URL =
  'https://69e9-2a02-c7c-aed0-6000-6dd3-94a3-f7b8-3744.ngrok-free.app/api/users';

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
      email: user.user.email,
      name: user.user.name,
      providerId: user.user.id,
      avatarUrl: user.user.photo,
    });

    return response.data.user;
  } catch (error) {
    console.error(error);
  }
};
