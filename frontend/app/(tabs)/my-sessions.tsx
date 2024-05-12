import { Pressable, StyleSheet } from "react-native";
import { useState } from "react";

import { Text, View } from "@/components/Themed";
import CreateSessionModal from "@/components/common/Modals/CreateSessionModal";
import { ISession } from "@/types/sessionTypes";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetUserSessions from "@/hooks/useGetUserSessions";

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
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Create Session</Text>
      </Pressable>
      <CreateSessionModal isVisible={isModalVisible} onClose={onModalClose} />
      {user ? (
        <View style={styles.sessionsContainer}>
          {userSessions?.map((session: ISession) => (
            <SessionView
              key={session.session_id}
              session={session}
              creatorAvatar={user.avatarUrl}
              creatorName={user.name}
              userId={user.user_id}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  sessionsContainer: {
    width: "100%",
    padding: 10,
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
