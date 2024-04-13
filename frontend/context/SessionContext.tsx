import { createContext, useState, ReactNode } from "react";

export interface ISession {
  session_id: string;
  created_at: Date;
  creator_id: string;
  date: string;
  gym_id: string;
  type: "PUBLIC" | "PRIVATE";
  skill_level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  max_participants: number;
  gender_pref: "ALLGENDERS" | "MALEONLY" | "FEMALEONLY";
  notes?: string;
}

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
