import { Button, FlatList, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetAllSessions from "@/hooks/useGetAllSessions";
import { ISession } from "@/types/sessionTypes";

export default function HomeScreen() {
  const { logout, user } = useUser();
  const { sessions } = useGetAllSessions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button title="Log out" onPress={logout} />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScrollView>
        {user
          ? sessions?.map((session: ISession) => (
              <SessionView
                key={session.session_id}
                session={session}
                userId={user.user_id}
                creatorAvatar={session.creator.avatarUrl}
                creatorName={session.creator.name}
              />
            ))
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
