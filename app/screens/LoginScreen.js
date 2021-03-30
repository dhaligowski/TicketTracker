import React, { useContext, useState } from "react";
import { StyleSheet, View, StatusBar, Platform } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppScreen from "../components/AppScreen";
import AppButton from "../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";
import colors from "../config/colors";
import AppFormField from "../components/AppFormField";
import authApi from "../api/auth";
import jwtDecode from "jwt-decode";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import ResizeAnimation from "../animations/ResizeAnimation";
import CircleActivityIndicator from "../animations/CircleActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginScreen({}) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    const result = await authApi.login(email, password);
    setLoading(false);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    //console.log("JWT TOKEN", result.data); //Verify JWT token https://jwt.io/
    const user = jwtDecode(result.data);
    authContext.setUser(user);
    authStorage.setUserToken(result.data);
  };

  return (
    <AppScreen style={styles.container}>
      {loading ? <CircleActivityIndicator animating={loading} /> : null}
      <View style={styles.form}>
        <ResizeAnimation>tt</ResizeAnimation>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit }) => (
            <>
              <ErrorMessage
                error="Invalid email and/or password."
                visible={loginFailed}
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                name="email"
                textContentType="emailAddress"
                width="85%"
              />

              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange("password")}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                width="85%"
              />
              <AppButton title="Login" onPress={handleSubmit} />
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

export default LoginScreen;
