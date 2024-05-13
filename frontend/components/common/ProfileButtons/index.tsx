import { StyleSheet, Text } from "react-native";
import Colors from "@/constants/Colors";
import Pressable from "@/components/Pressable";
import { View } from "@gluestack-ui/themed";

const ProfileButtons = ({ displaySocialButtons = false }) => {
  return (
    <View style={styles.container}>
      {/* If user views someone else's profile and they are NOT friends, show the Send Friend Request button + Report/Block */}
      {displaySocialButtons && (
        <View style={styles.socialButtonGroup}>
          <Pressable
            textElement={<Text>Send Friend Request</Text>}
            buttonColour={Colors.primary}
            textColour="black"
            otherButtonStyles={{ marginBottom: 20 }}
          />
          <Pressable
            textElement={<Text>Block</Text>}
            buttonColour={Colors.error}
            textColour="black"
            otherButtonStyles={{ marginBottom: 20 }}
          />
          <Pressable
            textElement={<Text>Report</Text>}
            buttonColour={Colors.neutral}
            textColour="black"
            otherButtonStyles={{ marginBottom: 20 }}
          />
        </View>
      )}
      <Pressable
        textElement={<Text>Edit Profile</Text>}
        buttonColour={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  socialButtonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});

export default ProfileButtons;
