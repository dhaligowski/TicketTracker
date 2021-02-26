import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButtonSmall({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: 25,
    width: "30%",
  },
  text: {
    flex: 1,
    color: "white",
    fontSize: 22,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default AppButtonSmall;
