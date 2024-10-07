import { getAllSessions } from "@/services/sessionService";
import { ISession } from "@/types/sessionTypes";
import { useQuery } from "@tanstack/react-query";

const useGetAllSessions = () => {
	const { data, error } = useQuery({
		queryKey: ["allSessions"],
		queryFn: () => getAllSessions(),
	});

	if (error) {
		console.error(error);
	}

	return { sessions: data as ISession[] };
};

export default useGetAllSessions;
