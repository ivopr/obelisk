import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, NativeBaseProviderProps } from "native-base";

import { StoresProvider } from "../stores";
import { theme } from "./extendedTheme";

export const Provider: React.FC<NativeBaseProviderProps> = ({
  children,
  ...rest
}) => {
  return (
    <NativeBaseProvider theme={theme} {...rest}>
      <StoresProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </StoresProvider>
    </NativeBaseProvider>
  );
};
