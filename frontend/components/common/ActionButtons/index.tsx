/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ISession, ISessionParticipant } from "@/types/sessionTypes";
import { UseMutationResult } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";

interface IProps {
	participant: ISessionParticipant | undefined;
	session: ISession;
	userId: string;
	colors: { text: string };
	leaveMutation: UseMutationResult<any, Error, string, unknown>;
	joinMutation: UseMutationResult<any, Error, void, unknown>;
	deleteMutation: UseMutationResult<any, Error, void, unknown>;
	closeModal?: () => void;
}

const ActionButtons = ({
	participant,
	session,
	userId,
	colors,
	joinMutation,
	leaveMutation,
	deleteMutation,
	closeModal,
}: IProps) => {
	return participant?.user_id !== userId ? (
		<Button
			className="bg-primary"
			disabled={
				session.participants.length >= session.max_participants ||
				session.creator_id === userId ||
				joinMutation.isPending
			}
			onPress={() => joinMutation.mutate()}
		>
			{joinMutation.isPending ? <ActivityIndicator color={colors.text} /> : <Text>Join</Text>}
		</Button>
	) : session.creator_id === userId ? (
		<Button
			variant="destructive"
			disabled={deleteMutation.isPending}
			onPress={() => {
				closeModal?.();
				deleteMutation.mutate();
			}}
		>
			{deleteMutation.isPending ? (
				<ActivityIndicator color={colors.text} />
			) : (
				<Text>Delete</Text>
			)}
		</Button>
	) : participant ? (
		<Button
			variant="secondary"
			onPress={() => {
				leaveMutation.mutate(participant.participant_id);
			}}
		>
			{leaveMutation.isPending || leaveMutation.isIdle ? (
				<ActivityIndicator color={colors.text} />
			) : (
				<Text>Leave</Text>
			)}
		</Button>
	) : null;
};

export default ActionButtons;
