import { ActivityIndicator, SafeAreaView, View } from "react-native";
import useUser from "@/hooks/useUser";
import { useTheme } from "@react-navigation/native";
import { H1 } from "@/components/ui/typography";

export default function HomeScreen() {
  const { user } = useUser();
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1 items-center mx-12">
      {user ? (
        <View>
          <H1>Hello {user.name.split(" ")[0]}</H1>
        </View>
      ) : (
        <ActivityIndicator size="large" color={colors.text} />
      )}
    </SafeAreaView>
  );
}

