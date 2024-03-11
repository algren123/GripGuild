import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { createUser, getUser } from '@/services/userService';

const useUser = () => {
  const {
    authUserInfo,
    userInfo,
    error,
    setUserInfo,
    setAuthUserInfo,
    setError,
  } = useContext(UserContext);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setAuthUserInfo(user);

      const existingUser = await getUser(user.user.email);

      if (!existingUser) {
        const newUser = await createUser(user);
        setUserInfo(newUser);
      } else {
        setUserInfo(existingUser);
      }

      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const logout = () => {
    console.log('logout pressed');
    setAuthUserInfo(null);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return { authUser: authUserInfo, user: userInfo, error, signIn, logout };
};

export default useUser;
