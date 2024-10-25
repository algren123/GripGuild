import React from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@gluestack-ui/themed";

interface IProfileButtonsProps {
	displaySocialButtons: boolean;
}

const ProfileButtons = ({ displaySocialButtons = false }: IProfileButtonsProps) => {
	return (
		<View>
			{/* If user views someone else's profile and they are NOT friends, show the Send Friend Request button + Report/Block */}
			{displaySocialButtons && (
				<View>
					<Button>
						<Text>Send Friend Request</Text>
					</Button>
					<Button>
						<Text>Block</Text>
					</Button>
					<Button>
						<Text>Report</Text>
					</Button>
				</View>
			)}
			<Button>
				<Text>Edit Profile</Text>
			</Button>
		</View>
	);
};

export default ProfileButtons;
