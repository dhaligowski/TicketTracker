import React from "react";
import { StyleSheet, FlatList } from "react-native";

function OpenTickets({ items }) {
  return (
    <FlatList data={items}>{items.filter((m) => m.status === "open")}</FlatList>
  );
}

export default OpenTickets;
