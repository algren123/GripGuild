import { View } from "@/components/Themed";
import { Text } from "@gluestack-ui/themed";
import GenderPreference from "@/constants/GenderPreference";
import SkillLevels from "@/constants/SkillLevels";
import { ISession } from "@/types/sessionTypes";
import {
  deleteSession,
  joinSession,
  leaveSession,
} from "@/services/sessionService";
import Pressable from "@/components/Pressable";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Colors from "@/constants/Colors";

interface IProps {
  session: ISession;
  userId: string;
  creatorAvatar: string;
  creatorName: string;
}

const SessionView = ({
  session,
  userId,
  creatorAvatar,
  creatorName,
}: IProps) => {
  const queryClient = useQueryClient();
  const {
    max_participants: maxParticipants,
    skill_level: skillLevel,
    date,
    gender_pref: genderPref,
  } = session;

  const firstName = creatorName.split(" ")[0];

  const leaveMutation = useMutation({
    mutationFn: (participantId: string) => leaveSession(participantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSessions"] });
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });

  const joinMutation = useMutation({
    mutationFn: () => joinSession(userId, session.session_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSessions"] });
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteSession(session.session_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allSessions"] });
      queryClient.invalidateQueries({ queryKey: ["userSessions"] });
    },
  });

  const localDate = new Date(date);
  const participant = session.participants.find(
    (participant) => participant.user_id === userId
  );

  return (
    <View style={styles.sessionContainer}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Image source={{ uri: creatorAvatar }} style={styles.avatar} />
          <Text style={{ fontWeight: "bold" }}>{firstName}'s Session</Text>
        </View>
        <Text>
          {session.participants.length}/{maxParticipants}
        </Text>
      </View>
      <Text>Skill Level - {SkillLevels[skillLevel]}</Text>
      <Text>Gym - {session.gym?.name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Date - {localDate.toDateString()}</Text>
        <Text>{GenderPreference[genderPref]}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Pressable
          textElement={<Text>View</Text>}
          otherButtonStyles={styles.button}
        />
        {participant?.user_id !== userId ? (
          <Pressable
            textElement={
              joinMutation.isPending ? (
                <ActivityIndicator color={Colors.dark.background} />
              ) : (
                <Text>Join</Text>
              )
            }
            buttonColour={Colors.success}
            disabled={
              session.participants.length >= maxParticipants ||
              session.creator_id === userId
            }
            otherButtonStyles={styles.button}
            onPress={() => joinMutation.mutate()}
          />
        ) : null}
        {session.creator_id === userId ? (
          <Pressable
            textElement={
              deleteMutation.isPending ? (
                <ActivityIndicator color={Colors.dark.background} />
              ) : (
                <Text>Delete</Text>
              )
            }
            buttonColour={Colors.error}
            otherButtonStyles={styles.button}
            onPress={() => deleteMutation.mutate()}
          />
        ) : !!participant ? (
          <Pressable
            textElement={
              leaveMutation.isPending ? (
                <ActivityIndicator color={Colors.dark.background} />
              ) : (
                <Text>Leave</Text>
              )
            }
            buttonColour={Colors.warning}
            otherButtonStyles={styles.button}
            onPress={() => leaveMutation.mutate(participant.participant_id)}
          />
        ) : null}
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
    marginHorizontal: 20,
    borderWidth: 2,
    borderBlockColor: Colors.dark.background,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    minWidth: 100,
    paddingHorizontal: 20,
  },
});
