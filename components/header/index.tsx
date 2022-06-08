import { Feather } from "@native-base/icons";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { observer } from "mobx-react";
import { Avatar, Heading, HStack, Icon } from "native-base";
import React from "react";

import { translate } from "../../languages";
import { useStores } from "../../stores";
import { Button } from "../button";

type HeaderProps = {
  name: keyof NativeStackParams;
};

GoogleSignin.configure({
  webClientId:
    "531182222053-mh1rdrrqjevr05bd33cqm9qpmtq9d4o1.apps.googleusercontent.com",
});

async function onGoogleButtonPress(): Promise<FirebaseAuthTypes.UserCredential> {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return await auth().signInWithCredential(googleCredential);
}

export const Header: React.FC<HeaderProps> = observer(({ name }) => {
  const { auth } = useStores();

  return (
    <HStack
      alignItems="center"
      height="16"
      justifyContent="space-between"
      paddingX="2.5"
    >
      <Heading>{translate(`screens.${name}`)}</Heading>
      <HStack space="1">
        {auth.signedIn && (
          <Avatar
            size="md"
            source={{
              uri: auth.user?.photoURL ?? "http://placekitten.com/512/512",
            }}
          />
        )}
        {!auth.signedIn && (
          <Button
            leftIcon={<Icon as={Feather} name="lock" />}
            maxWidth={150}
            onPress={onGoogleButtonPress}
            tx="common.sign-in"
          />
        )}
      </HStack>
    </HStack>
  );
});
