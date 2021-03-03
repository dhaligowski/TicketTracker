import Constants from "expo-constants";

const settings = {
  dev: {
    apiURL: "http://192.168.0.11:9000/api",
  },
  staging: {
    apiURL: "https://afternoon-spire-84745.herokuapp.com/api",
  },
  prod: {
    apiURL: "https://afternoon-spire-84745.herokuapp.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};
export default getCurrentSettings();
