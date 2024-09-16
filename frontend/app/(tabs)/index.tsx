import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { View } from "@gluestack-ui/themed";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetAllSessions from "@/hooks/useGetAllSessions";
import { ISession } from "@/types/sessionTypes";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen() {
  const { user } = useUser();
  const { colors } = useTheme();
  const { sessions } = useGetAllSessions();

  return (
    <View style={styles.container}>
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
          <ActivityIndicator size="large" color={colors.text} />
        )}
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
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
  sessionContainer: { width: "100%" },
});
