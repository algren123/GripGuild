import React from "react";
import { ActivityIndicator, FlatList, ListRenderItem, SafeAreaView } from "react-native";
import { useState } from "react";
import CreateSessionModal from "@/components/common/Modals/CreateSessionModal";
import { ISession } from "@/types/sessionTypes";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetUserSessions from "@/hooks/useGetUserSessions";
import { useTheme } from "@react-navigation/native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import ViewSessionModal from "@/components/common/Modals/ViewSessionModal";
import { useQueryClient } from "@tanstack/react-query";

export default function MySessionsScreen() {
	const queryClient = useQueryClient();
	const [isCreateSessionModalVisible, setCreateSessionModalVisible] = useState(false);
	const [isViewSessionModalVisible, setViewSessionModalVisible] = useState(false);
	const [viewedSession, setViewedSession] = useState<ISession | null>(null);
	const { colors } = useTheme();
	const { user } = useUser();
	const { userSessions } = useGetUserSessions(user?.user_id);

	const onCreateSessionModalClose = () => {
		setCreateSessionModalVisible(false);
	};

	const onViewSessionModalClose = () => {
		setViewSessionModalVisible(false);
	};

	const onViewSessionModalOpen = (session: ISession) => {
		setViewedSession(session);
		setViewSessionModalVisible(true);
	};

	const handleSessionChange = () => {
		const updatedSession = queryClient
			.getQueryData<ISession[]>(["allSessions"])
			?.find((sess: ISession) => sess.session_id === viewedSession?.session_id);

		if (updatedSession) {
			setViewedSession(updatedSession);
		}
	};

	const renderItem: ListRenderItem<ISession> = ({ item }: { item: ISession }) => {
		return user ? (
			<SessionView
				key={item.session_id}
				session={item}
				userId={user.user_id}
				creatorAvatar={item.creator.avatarUrl}
				creatorName={item.creator.name}
				openModal={() => onViewSessionModalOpen(item)}
			/>
		) : null;
	};

	return (
		<SafeAreaView className="flex-1 items-center mx-12">
			<Button
				className="my-6"
				variant="default"
				onPress={() => setCreateSessionModalVisible(true)}
			>
				<Text>Create Session</Text>
			</Button>
			<CreateSessionModal
				isVisible={isCreateSessionModalVisible}
				onClose={onCreateSessionModalClose}
			/>
			{viewedSession && user ? (
				<ViewSessionModal
					isVisible={isViewSessionModalVisible}
					onClose={onViewSessionModalClose}
					session={viewedSession}
					userId={user.user_id}
					onSessionChange={handleSessionChange}
				/>
			) : null}
			{user && userSessions ? (
				<FlatList
					data={userSessions}
					renderItem={renderItem}
					className="w-full"
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<ActivityIndicator size="large" color={colors.text} />
			)}
		</SafeAreaView>
	);
}
