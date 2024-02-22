import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import {
  GoogleSignin,
  GoogleSigninButton,
  User,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function Auth() {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "1062870520492-sudg8c1bdpfnkjnglbv3u9gdi773ovrq.apps.googleusercontent.com",
      // iosClientId:
      //   "1062870520492-ggg23b1kal30sm9pijftshe18qa8v54u.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setError(null);
    } catch (error) {
      setError(error as string);
    }
  };

  const logout = () => {
    setUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  console.log(error);

  return (
    <View style={styles.container}>
      {userInfo ? <Text>{JSON.stringify(error)}</Text> : null}
      {userInfo ? (
        <Text>{userInfo.user.email}</Text>
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
