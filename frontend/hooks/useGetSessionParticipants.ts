import { getSessionParticipants } from "@/services/sessionService";
import { useQuery } from "@tanstack/react-query";

const useGetSessionParticipants = (sessionId: string) => {
	const { data, error } = useQuery({
		queryKey: ["sessionParticipants", sessionId],
		queryFn: () => getSessionParticipants(sessionId),
		placeholderData: [],
	});

	if (error) {
		console.error(error);
	}

	return data;
};

export default useGetSessionParticipants;
