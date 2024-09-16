import { View } from "react-native";
import { Text } from "@/components/ui/text";
import GenderPreference from "@/constants/GenderPreference";
import SkillLevels from "@/constants/SkillLevels";
import { ISession } from "@/types/sessionTypes";
import {
  deleteSession,
  joinSession,
  leaveSession,
} from "@/services/sessionService";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { Button } from "@/components/ui/button";

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
  const { colors } = useTheme();
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
        <Button variant="outline">
          <Text>View</Text>
        </Button>
        {participant?.user_id !== userId ? (
          <Button
            className="bg-primary"
            disabled={
              session.participants.length >= maxParticipants ||
              session.creator_id === userId
            }
            onPress={() => joinMutation.mutate()}
          >
            {joinMutation.isPending ? (
              <ActivityIndicator color={colors.text} />
            ) : (
              <Text>Join</Text>
            )}
          </Button>
        ) : null}
        {session.creator_id === userId ? (
          <Button variant="destructive" onPress={() => deleteMutation.mutate()}>
            {deleteMutation.isPending ? (
              <ActivityIndicator color={colors.text} />
            ) : (
              <Text>Delete</Text>
            )}
          </Button>
        ) : !!participant ? (
          <Button
            variant="secondary"
            onPress={() => leaveMutation.mutate(participant.participant_id)}
          >
            {leaveMutation.isPending ? (
              <ActivityIndicator color={colors.text} />
            ) : (
              <Text>Leave</Text>
            )}
          </Button>
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
