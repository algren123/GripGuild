import { useContext } from "react";
import { SessionContext } from "@/context/SessionContext";

const useSessions = () => {
  const { joinedSessions, setJoinedSessions } = useContext(SessionContext);

  return { joinedSessions, setJoinedSessions };
};

export default useSessions;
