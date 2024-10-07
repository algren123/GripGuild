import {
  ActivityIndicator,
  ListRenderItem,
  FlatList,
  SafeAreaView,
} from "react-native";
import SessionView from "@/components/common/SessionView";
import useUser from "@/hooks/useUser";
import useGetAllSessions from "@/hooks/useGetAllSessions";
import { ISession } from "@/types/sessionTypes";
import { useTheme } from "@react-navigation/native";

export default function HomeScreen() {
  const { user } = useUser();
  const { colors } = useTheme();
  const { sessions } = useGetAllSessions();

  const renderItem: ListRenderItem<ISession> = ({
    item,
  }: {
    item: ISession;
  }) => {
    return user ? (
      <SessionView
        key={item.session_id}
        session={item}
        userId={user.user_id}
        creatorAvatar={item.creator.avatarUrl}
        creatorName={item.creator.name}
      />
    ) : null;
  };

  return (
    <SafeAreaView className="flex-1 items-center mx-12">
      {user ? (
        <FlatList
          data={sessions}
          // @ts-ignore
          renderItem={renderItem}
          className="w-full"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator size="large" color={colors.text} />
      )}
    </SafeAreaView>
  );
}
