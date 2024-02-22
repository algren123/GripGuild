import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, AppState, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
        "1062870520492-g9cdjtvgpmd0cchkk9mcm30fgnbjk0bq.apps.googleusercontent.com",
      iosClientId:
        "1062870520492-ggg23b1kal30sm9pijftshe18qa8v54u.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      console.log("pressed");
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
// const { mutateAsync: addUserMutation } = useMutation({
//   mutationFn: async (newUser: User) => {
//     console.log(newUser);
//     const data = await axios.post(
//       'https://0813-2a02-c7c-aed0-6000-edae-a4fe-24e1-7cd4.ngrok-free.app/api/users/signup',
//       {
//         name: displayName,
//         email: newUser.email,
//         supabaseUserId: newUser.id,
//       }
//     );

//     console.log(data);
//     return data;
//   },
//   onError: (error) => {
//     console.error(error);
//   },
// });

// async function signInWithEmail() {
//   setLoading(true);
//   const {
//     error,
//     data: { user },
//   } = await supabase.auth.signInWithPassword({
//     email: email,
//     password: password,
//   });

//   console.log(user);
//   if (error) Alert.alert(error.message);

//   setLoading(false);
// }

// async function signUpWithEmail() {
//   setLoading(true);
//   const {
//     data: { session, user },
//     error,
//   } = await supabase.auth.signUp({
//     email: email,
//     password: password,
//   });

//   if (error) Alert.alert(error.message);

//   if (user) {
//     try {
//       await addUserMutation(user);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   if (!session)
//     Alert.alert('Please check your inbox for email verification!');

//   setLoading(false);
// }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Input
//           label="Display Name"
//           leftIcon={{ type: 'font-awesome', name: 'envelope' }}
//           onChangeText={(text) => setDisplayName(text)}
//           value={displayName}
//           placeholder="Boulderer123"
//           autoCapitalize={'none'}
//         />
//       </View>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Input
//           label="Email"
//           leftIcon={{ type: 'font-awesome', name: 'envelope' }}
//           onChangeText={(text) => setEmail(text)}
//           value={email}
//           placeholder="email@address.com"
//           autoCapitalize={'none'}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Input
//           label="Password"
//           leftIcon={{ type: 'font-awesome', name: 'lock' }}
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//           secureTextEntry={true}
//           placeholder="Password"
//           autoCapitalize={'none'}
//         />
//       </View>
//       <View style={[styles.verticallySpaced, styles.mt20]}>
//         <Button
//           title="Sign in"
//           disabled={loading}
//           onPress={() => signInWithEmail()}
//         />
//       </View>
//       <View style={styles.verticallySpaced}>
//         <Button
//           title="Sign up"
//           disabled={loading}
//           onPress={() => signUpWithEmail()}
//         />
//       </View>
//     </View>
//   );
// }

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
