import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import AppButton from "../components/AppButton";
import ticketsApi from "../api/tickets";
import Constants from "expo-constants";
import AuthContext from "../auth/context";

function CreateTicketScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  React.useEffect(() => navigation.addListener("focus", () => setTitle("")), [
    title,
  ]);

  React.useEffect(() => navigation.addListener("focus", () => setText("")), [
    text,
  ]);

  const addNewTicket = async (title, text) => {
    const items = {
      id: 1,
      title: title,
      value: "NewTicket",
      description: text,
      status: "Open",
    };
    const response = await ticketsApi.addNewTicket(items);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textLarge}>Create Ticket</Text>

      <TextInput
        style={styles.textBox}
        placeholder="Ticket Title"
        onChangeText={(title) => setTitle(title)}
        value={title}
      />
      <TextInput
        style={styles.textBoxDescription}
        multiline
        numberOfLines={7}
        placeholder="Ticket Description"
        textAlignVertical="top"
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <AppButton
        title="Create Ticket"
        onPress={() => {
          text &&
            title &&
            addNewTicket(title, text).then(() =>
              navigation.navigate("Tickets", { screen: "Tickets" })
            );
        }}
      />
      {/* <AppButton
        title="Cancel"                Not needed after BottomTabNavigator installed
        onPress={() => {
          navigation.navigate("Tickets", { screen: "Tickets" });
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  textLarge: {
    fontSize: 40,
    padding: 5,
  },
  textBox: {
    width: "75%",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    fontSize: 20,
    backgroundColor: "white",
  },
  textBoxDescription: {
    width: "75%",
    height: "25%",
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
    fontSize: 20,
    backgroundColor: "white",
  },
});

export default CreateTicketScreen;
