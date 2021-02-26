//SecureStore was not implemented in this App so it would be able to be
// run via Web and still function.

import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";
let token = "";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync("key", authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) return jwtDecode(token);
  return null;
};

const removeToken = () => {
  try {
    SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

const setUserToken = (userToken) => {
  token = userToken;
};

const getUserToken = () => {
  return token;
};

export default {
  getUser,
  getUserToken,
  removeToken,
  setUserToken,
  storeToken,
};
