import { Image, StyleSheet } from 'react-native';

import Pressable from '@/components/Pressable';
import { Text, View } from '@/components/Themed';
import useUser from '@/hooks/useUser';
import Colors from '@/constants/Colors';

export default function ProfileScreen() {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      {user?.avatarUrl && (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      )}
      <Text style={styles.title}>{user?.name}</Text>
      <Text style={styles.bio}>{user?.bio}</Text>

      {/* If user views his own profile, don't render any of the Social CTAs */}
      {/* If user views someone else's profile and they are NOT friends, show the Send Friend Request button + Report/Block */}
      <View>
        <View style={styles.socialButtonGroup}>
          <Pressable
            text="Send Friend Request"
            buttonColour={Colors.primary}
            textColour="black"
            otherButtonStyles={{ marginBottom: 20 }}
          />
          <Pressable
            text="Block"
            buttonColour={Colors.error}
            textColour="black"
            otherButtonStyles={{ marginBottom: 20 }}
          />
          <Pressable
            text="Report"
            buttonColour={Colors.neutral}
            textColour="black"
            otherButtonStyles={{ marginBottom: 20 }}
          />
        </View>
        <Pressable text="Edit Profile" buttonColour={Colors.neutral} />
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* If user views a friend's profile, show Friend Status */}
      {/* If user views someone's profile and they have a "pending" request, show that */}

      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <Text>Skill Level</Text>
          <Text>{user?.climbing_level}</Text>
        </View>
        <View style={styles.headerItem}>
          <Text>Location</Text>
          <Text>{user?.location}</Text>
        </View>
        <View style={styles.headerItem}>
          <Text>Sessions Joined</Text>
          <Text>{user?.sessions_joined || 0}</Text>
        </View>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  bio: {
    fontSize: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
  },
  headerItem: {
    alignItems: 'center',
  },
  socialButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
