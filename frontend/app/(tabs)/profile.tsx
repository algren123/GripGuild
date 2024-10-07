import { Image, StyleSheet, View } from "react-native";

import useUser from "@/hooks/useUser";
import ProfileButtons from "@/components/common/ProfileButtons";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function ProfileScreen() {
  const { user, logout } = useUser();

  return (
    <View style={styles.container}>
      {user?.avatarUrl && (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      )}
      <Text>{user?.name}</Text>
      <Button variant="outline" onPress={logout}>
        <Text>Log Out</Text>
      </Button>
      <Text style={styles.bio}>{user?.bio}</Text>

      <ProfileButtons />

      <View style={styles.separator} />
      {/* If user views a friend's profile, show Friend Status */}
      {/* If user views someone's profile and they have a "pending" request, show that */}

      <View style={styles.headerContainer}>
        {user?.climbing_level ? (
          <View style={styles.headerItem}>
            <Text>Skill Level</Text>
            <Text>{user.climbing_level}</Text>
          </View>
        ) : null}
        {user?.location ? (
          <View style={styles.headerItem}>
            <Text>Location</Text>
            <Text>{user?.location}</Text>
          </View>
        ) : null}
        <View style={styles.headerItem}>
          <Text>Sessions Joined</Text>
          <Text>{user?.sessions_joined || 0}</Text>
        </View>
      </View>

      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  bio: {
    fontSize: 16,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 30,
  },
  headerItem: {
    alignItems: "center",
  },
});
