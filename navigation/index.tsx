import firebaseAuth from "@react-native-firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import React from "react";

import { Header } from "../components";
import { Tasks } from "../features";
import { useStores } from "../stores";

const Stack = createNativeStackNavigator<NativeStackParams>();

export const NativeNavigation: React.FC = observer(() => {
  const { auth } = useStores();

  const listeners = React.useCallback(async () => {
    const authListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        auth.setUser(user);
        auth.setSignedIn(true);
        auth.incSignInSuccess();
      } else {
        auth.setUser();
        auth.setSignedIn(false);
      }
    });

    return () => {
      authListener();
    };
  }, []);

  React.useEffect(() => {
    listeners();
  }, [listeners]);

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route: { name } }) => (
          <Header name={name as keyof NativeStackParams} />
        ),
      }}
    >
      <Stack.Screen name="tasks" component={Tasks} />
    </Stack.Navigator>
  );
});
