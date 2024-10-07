import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import GenderPreference from "@/constants/GenderPreference";
import SkillLevels from "@/constants/SkillLevels";
import { ISession } from "@/types/sessionTypes";
import {
  deleteSession,
  joinSession,
  leaveSession,
} from "@/services/sessionService";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@react-navigation/native";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Muted } from "@/components/ui/typography";

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
    <Card className="w-full my-3">
      <Muted className="text-center py-1">{localDate.toDateString()}</Muted>
      <Separator className="opacity-50" />
      <CardHeader className="flex-1 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Avatar alt="User's Avatar" className="mr-2">
            <AvatarImage source={{ uri: creatorAvatar }} />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
          <CardTitle>
            <Text className="my-auto font-bold">{firstName}'s Session</Text>
          </CardTitle>
        </View>
        <Text>
          {session.participants.length}/{maxParticipants}
        </Text>
      </CardHeader>
      <CardContent className="flex-1 flex-row">
        <View className="flex-1 items-center justify-center">
          <Text>Skill Level</Text>
          <Text className="font-bold">{SkillLevels[skillLevel]}</Text>
        </View>
        <Separator orientation="vertical" className="mx-1" />
        <View className="flex-1 items-center">
          <Text>Location</Text>
          <Text className="font-bold">{session.gym?.name}</Text>
        </View>
        <Separator orientation="vertical" className="mx-1" />
        <View className="flex-1 items-center">
          <Text>Gender Pref</Text>
          <Text className="font-bold">{GenderPreference[genderPref]}</Text>
        </View>
      </CardContent>
      <Separator orientation="horizontal" />
      <View className="flex-1 flex-row justify-between mx-5 my-3">
        <Button variant="outline">
          <Text>View</Text>
        </Button>
        {participant?.user_id !== userId ? (
          <Button
            className="bg-primary"
            disabled={
              session.participants.length >= maxParticipants ||
              session.creator_id === userId ||
              joinMutation.isPending
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
          <Button
            variant="destructive"
            disabled={deleteMutation.isPending}
            onPress={() => deleteMutation.mutate()}
          >
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
    </Card>
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
