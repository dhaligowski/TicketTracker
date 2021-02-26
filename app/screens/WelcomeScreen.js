import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  SafeAreaView,
} from "react-native";

import colors from "../config/colors";
import AppButton from "../components/AppButton";
import { color } from "react-native-reanimated";

function WelcomeScreen({ navigation }) {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const [spinText, setSpinText] = useState(new Animated.Value(0));
  const startValue = new Animated.Value(1);
  const endValue = 1.25;

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinWords = spinText.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: "3000",
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinText, {
        toValue: 1,
        duration: "3000",
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  });

  useEffect(() => {
    Animated.loop(
      Animated.spring(startValue, {
        toValue: endValue,
        friction: 0.75,
        useNativeDriver: true,
      }),
      { iterations: 2000 }
    ).start();
  }, [startValue, endValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ticket</Text>
      <Animated.View
        style={{
          height: 225,
          width: 225,
          transform: [{ rotate: spin }],

          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 35,
          padding: 20,
        }}
      >
        <Animated.Text
          style={{
            height: 200,

            backgroundColor: "black",
            fontSize: 125,
            fontWeight: "bold",
            transform: [{ rotate: spinWords }],
            //transform: [{ scale: startValue }],

            color: "white",
            //padding: 20,
            borderStyle: "solid",
          }}
        >
          tt
        </Animated.Text>
      </Animated.View>
      <Text style={styles.text}>tracker</Text>
      <AppButton
        title="LOGIN"
        onPress={() => navigation.navigate("LoginScreen")}
      />
      <AppButton
        title="REGISTER"
        onPress={() => navigation.navigate("RegisterScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 75,
    fontWeight: "bold",
  },
  logoText: {
    fontSize: 120,
    fontWeight: "bold",

    //color: colors.white,

    //backgroundColor: colors.secondary,
    borderRadius: 20,
  },
});

export default WelcomeScreen;
