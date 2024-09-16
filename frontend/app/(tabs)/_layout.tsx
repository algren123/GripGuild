import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import useUser from "@/hooks/useUser";
import AuthScreen from "@/components/authentication/AuthScreen";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@react-navigation/native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { colors } = useTheme();
  const { authUser } = useUser();

  return authUser ? (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerLeft: () => null,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="my-sessions"
        options={{
          title: "My Sessions",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  ) : (
    <AuthScreen />
  );
}
