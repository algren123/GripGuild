import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  SafeAreaView,
} from "react-native";
import { useState } from "react";

import CreateSessionModal from "@/components/common/Modals/CreateSessionModal";
import { ISession } from "@/types/sessionTypes";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetUserSessions from "@/hooks/useGetUserSessions";
import { useTheme } from "@react-navigation/native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function MySessionsScreen() {
  const { colors } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const { userSessions } = useGetUserSessions(user?.user_id);

  const onModalClose = () => {
    setModalVisible(false);
  };

  const renderItem: ListRenderItem<ISession> = ({
    item,
  }: {
    item: ISession;
  }) => {
    return user ? (
      <SessionView
        key={item.session_id}
        session={item}
        userId={user.user_id}
        creatorAvatar={item.creator.avatarUrl}
        creatorName={item.creator.name}
      />
    ) : null;
  };

  return (
    <SafeAreaView className="flex-1 items-center mx-12">
      <Button
        className="my-6"
        variant="default"
        onPress={() => setModalVisible(true)}
      >
        <Text>Create Session</Text>
      </Button>
      <CreateSessionModal isVisible={isModalVisible} onClose={onModalClose} />
      {user && userSessions ? (
        <FlatList
          data={userSessions}
          // @ts-ignore
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

