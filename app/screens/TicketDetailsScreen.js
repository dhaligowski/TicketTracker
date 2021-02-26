import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import AppButton from "../components/AppButton";
import ticketsApi from "../api/tickets";
import closeTicketApi from "../api/closeTicket";

function TicketDetailsScreen({ route, navigation }) {
  const [text, setText] = useState("");
  const { items, itemIndex } = route.params;

  const updateTicket = async (items) => {
    const response = await ticketsApi.updateTicket(items);
    items = response.data;
    return items;
  };

  const closeTicket = async (items) => {
    const response = await closeTicketApi.closeTicket(items);
    return response.data;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ticket # {itemIndex + 1}</Text>

      {/* <TextInput
        style={styles.textBoxDescriptionA}
        multiline
        numberOfLines={7}                   Displays the current ticket
        value={items.description}           above the ticket update info
        textAlignVertical="top"             Can add if needed
        placeholderTextColor={"black"}
      /> */}

      <TextInput
        style={styles.textBoxDescriptionB}
        multiline
        editable={items.status === "Closed" ? false : true}
        numberOfLines={7}
        placeholder={
          items.status === "Closed"
            ? "Cannot Modify, Ticket Closed"
            : "Update Ticket"
        }
        textAlignVertical="top"
        onChangeText={(text) => setText(text)}
      />
      <AppButton
        title="Post Ticket Update"
        onPress={
          !text
            ? null
            : () => {
                (items.description = text),
                  updateTicket(items).then(() => navigation.navigate("Ticket"));
              }
        }
      />
      <AppButton
        title={"Close Ticket"}
        onPress={() => {
          text && (items.description = text) && updateTicket(items),
            closeTicket(items).then(() => navigation.navigate("Ticket"));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 40,
  },
  textBoxDescriptionA: {
    width: "90%",
    height: "25%",
    padding: 10,
    fontSize: 20,
    backgroundColor: "white",
  },
  textBoxDescriptionB: {
    width: "90%",
    height: "25%",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    fontSize: 20,
    backgroundColor: "white",
  },
});

export default TicketDetailsScreen;
