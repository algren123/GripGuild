import React from "react";
import { ActivityIndicator, ListRenderItem, FlatList, SafeAreaView } from "react-native";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetAllSessions from "@/hooks/useGetAllSessions";
import { ISession } from "@/types/sessionTypes";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import ViewSessionModal from "@/components/common/Modals/ViewSessionModal";
import { useQueryClient } from "@tanstack/react-query";

export default function HomeScreen() {
	const queryClient = useQueryClient();
	const [isViewSessionModalVisible, setViewSessionModalVisible] = useState(false);
	const [viewedSession, setViewedSession] = useState<ISession | null>(null);
	const { user } = useUser();
	const { colors } = useTheme();
	const { sessions } = useGetAllSessions();

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
			setViewedSession(updatedSession); // Ensure viewedSession is up-to-date
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
			{user ? (
				<FlatList
					data={sessions}
					renderItem={renderItem}
					className="w-full"
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<ActivityIndicator size="large" color={colors.text} />
			)}
			{viewedSession && user ? (
				<ViewSessionModal
					isVisible={isViewSessionModalVisible}
					onClose={onViewSessionModalClose}
					session={viewedSession}
					userId={user.user_id}
					onSessionChange={handleSessionChange}
				/>
			) : null}
		</SafeAreaView>
	);
}
