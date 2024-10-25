import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import GenderPreference from "@/constants/GenderPreference";
import SkillLevels from "@/constants/SkillLevels";
import { ISession } from "@/types/sessionTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Muted } from "@/components/ui/typography";
import { getFirstName } from "@/lib/utils";
import ActionButtons from "../ActionButtons";
import { deleteMutation, joinMutation, leaveMutation } from "@/services/mutationService";

interface IProps {
	session: ISession;
	userId: string;
	creatorAvatar: string;
	creatorName: string;
	openModal: () => void;
}

const SessionView = ({ session, userId, creatorAvatar, creatorName, openModal }: IProps) => {
	const { colors } = useTheme();
	const queryClient = useQueryClient();
	const {
		max_participants: maxParticipants,
		skill_level: skillLevel,
		date,
		gender_pref: genderPref,
	} = session;

	const localDate = new Date(date);
	const participant = session.participants.find((participant) => participant.user_id === userId);

	const joinSession = joinMutation(queryClient, userId, session.session_id);
	const leaveSession = leaveMutation(queryClient);
	const deleteSession = deleteMutation(queryClient, session.session_id);

	return (
		<Card className="w-full my-3">
			<Muted className="text-center py-1">{localDate.toDateString()}</Muted>
			<Separator className="opacity-50" />
			<CardHeader className="flex-1 flex-row justify-between items-center">
				<View className="flex-row items-center">
					<Avatar alt="User's Avatar" className="mr-2">
						<AvatarImage source={{ uri: creatorAvatar }} />
						<AvatarFallback>
							<Text>ZN</Text>
						</AvatarFallback>
					</Avatar>
					<CardTitle>
						<Text className="my-auto font-bold">
							{getFirstName(creatorName)}&apos;s Session
						</Text>
					</CardTitle>
				</View>
				<Text>
					{session.participants.length}/{maxParticipants}
				</Text>
			</CardHeader>
			<CardContent className="flex-1 flex-row">
				<View className="flex-1 items-center justify-center">
					<Text>Skill Level</Text>
					<Text className="font-bold">{SkillLevels[skillLevel]}</Text>
				</View>
				<Separator orientation="vertical" className="mx-1" />
				<View className="flex-1 items-center">
					<Text>Location</Text>
					<Text className="font-bold">{session.gym?.name}</Text>
				</View>
				<Separator orientation="vertical" className="mx-1" />
				<View className="flex-1 items-center">
					<Text>Gender Pref</Text>
					<Text className="font-bold">{GenderPreference[genderPref]}</Text>
				</View>
			</CardContent>
			<Separator orientation="horizontal" />
			<View className="flex-1 flex-row justify-between mx-5 my-3">
				<ActionButtons
					participant={participant}
					session={session}
					userId={userId}
					colors={colors}
					joinMutation={joinSession}
					leaveMutation={leaveSession}
					deleteMutation={deleteSession}
				/>
				<Button variant="outline" onPress={openModal}>
					<Text>View</Text>
				</Button>
			</View>
		</Card>
	);
};

export default SessionView;
