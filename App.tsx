import "expo-dev-client";

import * as SplashScreen from "expo-splash-screen";
import React from "react";

import { NativeNavigation } from "./navigation";
import { Provider } from "./provider";
import { hydrateStores } from "./stores";

export default function App() {
  const [loaded, setLoaded] = React.useState(false);

  const startApp = React.useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    await hydrateStores();

    setLoaded(true);
  }, []);

  React.useEffect(() => {
    if (!loaded) {
      startApp();
    } else {
      (async () => await SplashScreen.hideAsync())();
    }
  }, [startApp, loaded]);

  return (
    <Provider>
      <NativeNavigation />
    </Provider>
  );
}
