import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import AppButton from "../components/AppButton";

const { width } = Dimensions.get("window");

const CIRCLE_SIZE = 100;

function AnimatedAppButton({ title, onPress, animatedValue }) {
  return (
    <Animated.View
      style={[
        styles.circle,
        {
          transform: [
            {
              perspective: 400,
            },
            {
              rotateY: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ["0deg", "-90deg", "-180deg"],
              }),
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 8, 1],
              }),
            },
            //   {
            //     translateX: animatedValue.interpolate({
            //       inputRange: [0, 0.5, 1],
            //       outputRange: ["0%", "50%", "0%"],
            //     }),
            //   },
          ],
        },
      ]}
    >
      <AppButton title={"LOGIN"} onPress={onPress} />
      {/* <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
}

function ButtonAnimation({ onPress }) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const onPressAnimate = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <AnimatedAppButton
        onPress={onPressAnimate}
        animatedValue={animatedValue}
        title={"LOGIN"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "flex-start",
  },
  circle: {
    //backgroundColor: "#444",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    //backgroundColor: "transparent",
    //alignItems: "center",
    //justifyContent: "center",
  },
  circleContainer: {
    //flex: 1,
    //justifyContent: "flex-end",
    //alignItems: "center",
    //padding: 8,
    //paddingBottom: 100,
    //backgroundColor: "gold",
  },
});

export default ButtonAnimation;
