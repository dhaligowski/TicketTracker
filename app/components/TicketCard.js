import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function Card({ title, subTitle, description, status, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.detailsContainer}>
          <View style={styles.hText}>
            <Text style={styles.subTitle} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={1}>
              Status: {status}
            </Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {subTitle}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 3,
    margin: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
  hText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Card;
