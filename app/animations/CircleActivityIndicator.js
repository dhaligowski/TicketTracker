import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import colors from "../config/colors";

const CircleActivityIndicator = ({ loading }) => (
  <ActivityIndicator
    animating={loading}
    size="large"
    color={colors.black}
    style={styles.overlay}
  />
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    zIndex: 1,
    opacity: 0.5,
  },
});

export default CircleActivityIndicator;
