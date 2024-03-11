import { User as AuthUser } from '@react-native-google-signin/google-signin';
import { createContext, useState, ReactNode } from 'react';

interface IUser {
  user_id: string;
  name: string;
  email: string;
  providerId: string;
  avatarUrl: string;
  created_at: Date;
  updated_at: Date;
  location: string;
  bio: string;
  climbing_level: string;
  gender: string;
  sessions_joined: number;
}

interface IUserContext {
  authUserInfo: AuthUser | null;
  userInfo: IUser | null;
  error: string | unknown;
  setError: (error: string | unknown) => void;
  setAuthUserInfo: (userInfo: AuthUser | null) => void;
  setUserInfo: (userInfo: IUser | null) => void;
}

export const UserContext = createContext<IUserContext>({
  authUserInfo: null,
  userInfo: null,
  error: null,
  setError: () => {},
  setAuthUserInfo: () => {},
  setUserInfo: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [authUserInfo, setAuthUserInfo] = useState<AuthUser | null>(null);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [error, setError] = useState<string | unknown>(null);

  return (
    <UserContext.Provider
      value={{
        authUserInfo,
        userInfo,
        error,
        setAuthUserInfo,
        setUserInfo,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
