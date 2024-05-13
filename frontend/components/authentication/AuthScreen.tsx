import React, { useEffect } from "react";
import { Text, ImageBackground, Pressable } from "react-native";
import { StyleSheet, View } from "react-native";
import useUser from "@/hooks/useUser";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";

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
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>GRIPGUILD</Text>
          <Text style={styles.introText}>
            Connect, Climb, Conquer. Your adventure awaits in the Bouldering
            Community!
          </Text>
          <Pressable style={styles.googleButton} onPress={signIn}>
            <Text style={styles.signInText}>
              Sign In or Register with Google{"  "}
              <FontAwesome name="google" size={16} color="black" />
            </Text>
          </Pressable>
          <Text style={styles.terms}>
            By registering you are accepting our terms of use and privacy policy
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 16,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textContainer: {
    marginTop: "auto",
  },
  header: {
    fontSize: 24,
    color: "white",
    letterSpacing: 10,
    fontWeight: "700",
  },
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
    backgroundColor: Colors.primary,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
