import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, View } from "@gluestack-ui/themed";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetAllSessions from "@/hooks/useGetAllSessions";
import { ISession } from "@/types/sessionTypes";
import Colors from "@/constants/Colors";

export default function HomeScreen() {
  const { logout, user } = useUser();
  const { sessions } = useGetAllSessions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} />
      <ScrollView style={styles.sessionContainer}>
        {user ? (
          sessions?.map((session: ISession) => (
            <SessionView
              key={session.session_id}
              session={session}
              userId={user.user_id}
              creatorAvatar={session.creator.avatarUrl}
              creatorName={session.creator.name}
            />
          ))
        ) : (
          <ActivityIndicator size="large" color={Colors.dark.background} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
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
  sessionContainer: { width: "100%" },
});
