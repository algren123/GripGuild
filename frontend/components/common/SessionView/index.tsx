import { View } from "@/components/Themed";
import { Text } from "@/components/Themed";
import GenderPreference, {
  TGenderPreference,
} from "@/constants/GenderPreference";
import SkillLevels, { TSkillLevel } from "@/constants/SkillLevels";
import { ISession } from "@/types/sessionTypes";
import { leaveSession } from "@/services/sessionService";
import { Button, Image, StyleSheet } from "react-native";

interface IProps {
  session: ISession;
  userId: string;
  creatorAvatar: string;
  creatorName: string;
}

const leave = async (userId: string, session: ISession) => {
  const participant = session.participants.find(
    (participant) => participant.user_id === userId
  );

  if (participant && participant.user_id !== session.creator_id) {
    await leaveSession(participant.participant_id);
  }

  console.error(
    `Participant is not in the session or participant is creator: ${participant}`
  );
};

const SessionView = ({
  session,
  userId,
  creatorAvatar,
  creatorName,
}: IProps) => {
  const {
    max_participants: maxParticipants,
    skill_level: skillLevel,
    date,
    gender_pref: genderPref,
  } = session;

  const localDate = new Date(date);

  return (
    <View style={styles.sessionContainer}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Image source={{ uri: creatorAvatar }} style={styles.avatar} />
          <Text>{creatorName}'s Session</Text>
        </View>
        <Text>
          {session.participants.length}/{maxParticipants}
        </Text>
      </View>
      <Text>{SkillLevels[skillLevel]}</Text>
      <Text>{session.gym?.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{localDate.toDateString()}</Text>
        <Text>{GenderPreference[genderPref]}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button title="View" />
        <Button title="Leave" onPress={() => leave(userId, session)} />
      </View>
    </View>
  );
};

export default SessionView;

const styles = StyleSheet.create({
  sessionContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
});
