import { getAllSessions } from "@/services/sessionService";
import { useQuery } from "@tanstack/react-query";

const useGetAllSessions = () => {
  const { data, error } = useQuery({
    queryKey: ["allSessions"],
    queryFn: () => getAllSessions(),
  });

  if (error) {
    console.error(error);
  }

  return { sessions: data };
};

export default useGetAllSessions;
