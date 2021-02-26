import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TicketDetailsScreen from "../screens/TicketDetailsScreen";
import TicketScreen from "../screens/TicketScreen";

const Stack = createStackNavigator();

const DetailsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Ticket"
      component={TicketScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TicketDetails"
      component={TicketDetailsScreen}
      //options={{ headerShown: false }}  show back arrow on screen
    />
  </Stack.Navigator>
);

export default DetailsNavigator;
