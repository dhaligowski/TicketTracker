import Constants from "expo-constants";

const settings = {
  dev: {
    apiURL: "http://192.168.X.XX:9000/api", //add ip address here for local testing.
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
