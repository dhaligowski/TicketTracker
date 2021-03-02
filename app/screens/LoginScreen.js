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

// //////////////////////////////////////////////////////////////////////////////////////

// const CIRCLE_SIZE = 100;

// const Circle = ({ onPress, animatedValue }) => {
//   const inputRange = [0, 0.001, 0.5, 0.501, 1];
//   const containerBg = animatedValue.interpolate({
//     inputRange,
//     outputRange: ["gold", "gold", "gold", "#444", "#444"], ///immidate apply new color
//   });
//   const circleBg = animatedValue.interpolate({
//     inputRange,
//     outputRange: ["#444", "#444", "#444", "gold", "gold"], ///immidate apply new color
//   });

//   return (
//     <Animated.View
//       style={[
//         StyleSheet.absoluteFillObject,
//         styles.circleContainer,
//         { backgroundColor: containerBg },
//       ]}
//     >
//       <Animated.View
//         style={[
//           styles.circle,
//           {
//             backgroundColor: circleBg,
//             transform: [
//               {
//                 perspective: 300,
//               },
//               {
//                 rotateY: animatedValue.interpolate({
//                   inputRange: [0, 0.5, 1],
//                   outputRange: ["0deg", "-90deg", "-180deg"],
//                 }),
//               },
//               {
//                 scale: animatedValue.interpolate({
//                   inputRange: [0, 0.5, 1],
//                   outputRange: [1, 8, 1],
//                 }),
//               },
//               // {
//               //   translateX: animatedValue.interpolate({
//               //     inputRange: [0, 0.5, 1],
//               //     outputRange: ["0%", "50%", "0%"],
//               //   }),
//               // },
//             ],
//           },
//         ]}
//       >
//         <TouchableOpacity onPress={onPress}>
//           <View style={[styles.circle, styles.circleButton]}>
//             <AntDesign name="arrowright" size={28} color={"white"} />
//           </View>
//         </TouchableOpacity>
//       </Animated.View>
//     </Animated.View>
//   );
// };

// /////////////////////////////////////////////////////////////////////////////////////////

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

function LoginScreen({}) {
  const authContext = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    console.log("JWT TOKEN", result.data); //Verify JWT token https://jwt.io/
    const user = jwtDecode(result.data);
    authContext.setUser(user);
    authStorage.setUserToken(result.data);
  };

  return (
    <AppScreen style={styles.container}>
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
