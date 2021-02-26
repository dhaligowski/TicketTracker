import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import colors from "../config/colors";

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
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "85%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AnimatedAppButton;
