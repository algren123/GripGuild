import { createContext, useState, ReactNode } from "react";
import { ISession } from "@/types/sessionTypes";

interface ISessionContext {
  joinedSessions: ISession[] | null;
  setJoinedSessions: (sessions: ISession[] | null) => void;
}

export const SessionContext = createContext<ISessionContext>({
  joinedSessions: null,
  setJoinedSessions: () => {},
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [joinedSessions, setJoinedSessions] = useState<ISession[] | null>(null);

  return (
    <SessionContext.Provider value={{ joinedSessions, setJoinedSessions }}>
      {children}
    </SessionContext.Provider>
  );
};
