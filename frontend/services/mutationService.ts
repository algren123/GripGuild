import { useMutation } from "@tanstack/react-query";
import { deleteSession, joinSession, leaveSession } from "./sessionService";
import { QueryClient } from "@tanstack/react-query";

export const leaveMutation = (queryClient: QueryClient, onSessionChange: () => void) =>
	useMutation({
		mutationFn: (participantId: string) => leaveSession(participantId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allSessions"] });
			queryClient.invalidateQueries({ queryKey: ["userSessions"] });
			queryClient.invalidateQueries({ queryKey: ["sessionParticipants"] });
			onSessionChange();
		},
	});

export const joinMutation = (
	queryClient: QueryClient,
	userId: string,
	sessionId: string,
	onSessionChange: () => void
) =>
	useMutation({
		mutationFn: () => joinSession(userId, sessionId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allSessions"] });
			queryClient.invalidateQueries({ queryKey: ["userSessions"] });
			queryClient.invalidateQueries({ queryKey: ["sessionParticipants"] });
			onSessionChange();
		},
	});

export const deleteMutation = (queryClient: QueryClient, sessionId: string) =>
	useMutation({
		mutationFn: () => deleteSession(sessionId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allSessions"] });
			queryClient.invalidateQueries({ queryKey: ["userSessions"] });
		},
	});
