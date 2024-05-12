import { getUserSessions } from "@/services/sessionService";
import { useQuery } from "@tanstack/react-query";

const useGetUserSessions = (userId?: string) => {
  const { data, error } = useQuery({
    queryKey: ["userSessions"],
    queryFn: userId ? () => getUserSessions(userId) : undefined,
    enabled: !!userId,
  });

  if (error) {
    console.error(error);
  }

  return { userSessions: data };
};

export default useGetUserSessions;
