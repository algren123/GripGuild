import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useState } from "react";

import { Text, View } from "@gluestack-ui/themed";
import CreateSessionModal from "@/components/common/Modals/CreateSessionModal";
import { ISession } from "@/types/sessionTypes";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetUserSessions from "@/hooks/useGetUserSessions";
import Colors from "@/constants/Colors";

export default function MySessionsScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const { userSessions } = useGetUserSessions(user?.user_id);

  const onModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Joined Sessions</Text>
      <Pressable
        style={{ marginBottom: 20 }}
        onPress={() => setModalVisible(true)}
      >
        <Text>Create Session</Text>
      </Pressable>
      <CreateSessionModal isVisible={isModalVisible} onClose={onModalClose} />
      {user && userSessions ? (
        <View style={styles.sessionsContainer}>
          {userSessions?.map((session: ISession) => (
            <SessionView
              key={session.session_id}
              session={session}
              creatorAvatar={session.creator.avatarUrl}
              creatorName={session.creator.name}
              userId={user.user_id}
            />
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" color={Colors.dark.background} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    alignItems: "center",
  },
  sessionsContainer: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
