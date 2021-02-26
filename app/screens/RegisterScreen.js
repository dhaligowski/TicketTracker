import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Keyboard,
  Animated,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AppScreen from "../components/AppScreen";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AppFormField from "../components/AppFormField";
import authApi from "../api/auth";
import usersApi from "../api/register";
import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import ErrorMessage from "../components/ErrorMessage";
import ResizeAnimation from "../animations/ResizeAnimation";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function RegisterScreen({}) {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async (userInfo) => {
    const result = await usersApi.register(userInfo);
    if (!result.ok) {
      setLoginFailed(true);
      if (result.data) {
        setError(result.data.error);
      } else {
        setError("An undexpcted error occured.");
      }
      return;
    }
    const loginResult = await authApi.login(userInfo.email, userInfo.password);
    const authToken = loginResult.data;
    console.log("JWT TOKEN", authToken);
    const user = jwtDecode(authToken);
    authContext.setUser(user);
    authStorage.setUserToken(loginResult.data);
  };

  return (
    <AppScreen style={styles.container}>
      <View style={styles.form}>
        <ResizeAnimation>tt</ResizeAnimation>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <ErrorMessage error={error} visible={loginFailed} />

              <AppFormField
                autoCorrect={false}
                icon="account"
                placeholder="Name"
                name="name"
                width="85%"
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                placeholder="Email"
                keyboardType="email-address"
                name="email"
                textContentType="emailAddress"
                width="85%"
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                width="85%"
              />

              <AppButton title="Register" onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //alignItems: "center",
    //justifyContent: "space-evenly",
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

export default RegisterScreen;
