import { ConfigContext, ExpoConfig } from "@expo/config";
const IS_DEV = process.env.APP_VARIANT === "development";
const IS_BETA = process.env.APP_VARIANT === "beta";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: IS_DEV ? "[DEV] Obelisk" : IS_BETA ? "Obelisk Beta" : "Obelisk",
  slug: "obelisk",
  scheme: "obelisk",
  version: "1.0.0",
  orientation: "portrait",
  icon: IS_DEV
    ? "./assets/icons/icon-dev.png"
    : IS_BETA
    ? "./assets/icons/icon-beta.png"
    : "./assets/icons/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: IS_DEV ? "com.demonicat.devtasks" : "com.demonicat.tasks",
    googleServicesFile: "./google-services.json",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "@react-native-firebase/app",
    "@react-native-firebase/crashlytics",
    "@react-native-firebase/perf",
    "@react-native-google-signin/google-signin",
  ],
});
