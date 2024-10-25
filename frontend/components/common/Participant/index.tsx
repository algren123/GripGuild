import React from "react";
import { View } from "react-native";
import { TUserParticipant } from "@/types/userTypes";
import { getFirstName } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";

type TParticipant = {
	participant: TUserParticipant | null;
};

const Participant = ({ participant }: TParticipant) => {
	return participant?.user ? (
		<View className="w-[40%] m-2 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
			<View className="flex justify-center items-center">
				<Avatar alt="User's Avatar" className="rounded-full border-2 border-gray-300">
					<AvatarImage source={{ uri: participant.user.avatarUrl }} />
					<AvatarFallback>
						<Text>ZN</Text>
					</AvatarFallback>
				</Avatar>
				<CardTitle>
					<Text className="font-semibold text-gray-800 text-base">
						{getFirstName(participant.user.name)}
					</Text>
				</CardTitle>
			</View>
		</View>
	) : (
		<View className="w-[40%] m-2 p-4 rounded-lg bg-gray-200 border-2 border-dashed border-gray-400 shadow-md">
			<View className="flex justify-center items-center">
				<Avatar
					alt="Open slot avatar"
					className="rounded-full border-2 border-gray-400 overflow-hidden"
				>
					<AvatarFallback>
						<Text className="text-2xl font-bold text-gray-500">?</Text>
					</AvatarFallback>
				</Avatar>
				<CardTitle>
					<Text className="font-bold text-lg text-gray-600">Open Slot</Text>
				</CardTitle>
			</View>
		</View>
	);
};

export default Participant;
