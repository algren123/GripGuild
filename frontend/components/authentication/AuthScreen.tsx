import React, { useEffect } from "react";
import { ImageBackground } from "react-native";
import { StyleSheet, View } from "react-native";
import useUser from "@/hooks/useUser";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function AuthScreen() {
  const { error, signIn } = useUser();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  });

  return (
    <ImageBackground
      source={require("../../assets/images/auth-bg.jpg")}
      resizeMode="cover"
      className="h-full"
    >
      <View className="flex-1 justify-end my-6 mx-3">
        <View>
          <Text className="font-bold text-4xl tracking-widest text-white">
            GRIPGUILD
          </Text>
          <Text className="text-white text-2xl my-6">
            Connect, Climb, Conquer. Your adventure awaits in the Bouldering
            Community!
          </Text>
          <Button className="bg-primary mb-2" onPress={signIn}>
            <Text style={styles.signInText}>
              Sign In or Register with Google{"  "}
              <FontAwesome name="google" size={16} color="white" />
            </Text>
          </Button>
          <Text style={styles.terms}>
            By registering you are accepting our terms of use and privacy policy
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  introText: {
    fontSize: 20,
    color: "white",
    letterSpacing: 0.5,
    fontWeight: "400",
    marginTop: 20,
  },
  terms: {
    color: "white",
  },
  signInText: {
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  googleButton: {
    padding: 12,
    marginVertical: 40,
    width: "100%",
    borderRadius: 20,
  },
});
