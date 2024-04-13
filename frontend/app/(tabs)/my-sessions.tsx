import { Pressable, StyleSheet, Touchable } from "react-native";
import { useEffect, useState } from "react";

import { Text, View } from "@/components/Themed";
import useUser from "@/hooks/useUser";
import { getUserSessions } from "@/services/sessionService";
import CreateSessionModal from "@/components/common/Modals/CreateSessionModal";
import { ISession } from "@/context/SessionContext";

export default function MySessionsScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  const [joinedSessions, setJoinedSessions] = useState<any>(null);

  const onModalClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (user) {
      const handleUserSessions = async (userId: string) => {
        const userSessions = await getUserSessions(userId);
        setJoinedSessions(userSessions);
      };

      handleUserSessions(user?.user_id);
    }
  }, []);

  console.log(joinedSessions);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sessions</Text>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text>Create Session</Text>
      </Pressable>
      <CreateSessionModal isVisible={isModalVisible} onClose={onModalClose}>
        <View></View>
      </CreateSessionModal>
      {joinedSessions?.map((session: any) => {
        return (
          <View key={session.session_id}>
            <Text>{session.creator.name.split(" ")[0]}'s Session</Text>
            <Text>{session.type}</Text>
            <Text>{session.date}</Text>
            <Text>{session.skill_level}</Text>
            <Text>{session.max_participants}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
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
