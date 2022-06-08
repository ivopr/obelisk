import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, NativeBaseProviderProps } from "native-base";

import { StoresProvider } from "../stores";

export const Provider: React.FC<NativeBaseProviderProps> = ({
  children,
  ...rest
}) => {
  return (
    <NativeBaseProvider {...rest}>
      <StoresProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </StoresProvider>
    </NativeBaseProvider>
  );
};
