import React from "react";
import { FlatList, Modal, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import GenderPreference from "@/constants/GenderPreference";
import SkillLevels from "@/constants/SkillLevels";
import { ISession } from "@/types/sessionTypes";
import { getFirstName } from "@/lib/utils";
import useGetSessionParticipants from "@/hooks/useGetSessionParticipants";
import Participant from "../../Participant";
import { TUserParticipant } from "@/types/userTypes";
import { useQueryClient } from "@tanstack/react-query";
import ActionButtons from "../../ActionButtons";
import { useTheme } from "@react-navigation/native";
import { deleteMutation, joinMutation, leaveMutation } from "@/services/mutationService";

interface IProps {
	isVisible: boolean;
	onClose: () => void;
	session: ISession;
	userId: string;
	onSessionChange: () => void;
}

const ViewSessionModal = ({ isVisible, onClose, session, userId, onSessionChange }: IProps) => {
	const { colors } = useTheme();
	const queryClient = useQueryClient();
	const sessionParticipants = useGetSessionParticipants(session.session_id);

	const remainingPlaces =
		session.max_participants - (sessionParticipants ? sessionParticipants.length : 0);
	const displayParticipants: (TUserParticipant | null)[] = sessionParticipants
		? sessionParticipants.concat(new Array(remainingPlaces).fill(null))
		: new Array(session.max_participants).fill(null);
	const participant = session.participants.find((session) => session.user_id === userId);

	const joinSession = joinMutation(queryClient, userId, session.session_id, onSessionChange);
	const leaveSession = leaveMutation(queryClient, onSessionChange);
	const deleteSession = deleteMutation(queryClient, session.session_id);

	onSessionChange();

	return (
		<Modal animationType="slide" transparent visible={isVisible}>
			<View className="bg-background h-full p-6 mt-auto mx-auto w-full max-w-xl">
				<Card className="w-full my-3">
					<CardHeader className="flex-row justify-between items-center">
						<View className="flex-row items-center">
							<Avatar alt="User's Avatar" className="mr-2">
								<AvatarImage source={{ uri: session.creator.avatarUrl }} />
								<AvatarFallback>
									<Text>ZN</Text>
								</AvatarFallback>
							</Avatar>
							<CardTitle>
								<Text className="my-auto font-bold">
									{getFirstName(session.creator.name)}&apos;s Session
								</Text>
							</CardTitle>
						</View>
						<Text>
							{session.participants.length}/{session.max_participants}
						</Text>
					</CardHeader>
					<CardContent className="flex-row justify-between">
						<View className="items-center justify-center">
							<Text>Skill Level</Text>
							<Text className="font-bold">{SkillLevels[session.skill_level]}</Text>
						</View>
						<Separator orientation="vertical" className="mx-1" />
						<View className="items-center">
							<Text>Location</Text>
							<Text className="font-bold">{session.gym?.name}</Text>
						</View>
						<Separator orientation="vertical" className="mx-1" />
						<View className="items-center">
							<Text>Gender Pref</Text>
							<Text className="font-bold">
								{GenderPreference[session.gender_pref]}
							</Text>
						</View>
					</CardContent>
					<Separator orientation="horizontal" />
					<View className="flex flex-row justify-center">
						{sessionParticipants ? (
							<FlatList
								data={displayParticipants}
								renderItem={({ item }) => <Participant participant={item} />}
								keyExtractor={(_, index) => index.toString()}
								numColumns={2}
								columnWrapperStyle={{ justifyContent: "space-evenly" }}
								contentContainerStyle={{
									paddingBottom: 20,
									paddingTop: 10,
									paddingHorizontal: 0,
								}}
							/>
						) : null}
					</View>
					<View className="flex flex-row gap-2 mb-4 items-center justify-between w-full">
						<ActionButtons
							participant={participant}
							session={session}
							userId={userId}
							colors={colors}
							closeModal={onClose}
							joinMutation={joinSession}
							leaveMutation={leaveSession}
							deleteMutation={deleteSession}
						/>
						<Button onPress={onClose}>
							<Text>Close</Text>
						</Button>
					</View>
				</Card>
			</View>
		</Modal>
	);
};

export default ViewSessionModal;
