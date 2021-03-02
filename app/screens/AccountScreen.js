import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Platform, StatusBar } from "react-native";
import AppButton from "../components/AppButton";
import AuthContext from "../auth/context";
import ticketApi from "../api/ticket";

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);
  const [] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };
  const handleClear = async () => {
    const response = await ticketApi
      .getTicket("Reset")
      .then(() => navigation.navigate("Ticket"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.accountText}>User Name:</Text>
      <Text style={styles.userText}>{user.name}</Text>
      <Text style={styles.accountText}>User Email:</Text>
      <Text style={styles.userText}>{user.email}</Text>

      <AppButton title="Logout" onPress={handleLogout} />
      <AppButton title="Clear Tickets" onPress={handleClear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  accountText: {
    fontSize: 30,
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  userText: {
    fontSize: 35,
    fontWeight: "500",
    alignSelf: "center",
  },
});

export default AccountScreen;
