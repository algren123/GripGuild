import { User as AuthUser } from "@react-native-google-signin/google-signin";
import { createContext, useState, ReactNode } from "react";
import IUser from "@/types/userTypes";

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
