import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNaviator from "./app/navigation/AuthNavigator";
import AppNaviator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import { AppLoading } from "expo";
export default function App() {
  const [user, setUser] = useState();
  //const [] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNaviator /> : <AuthNaviator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
