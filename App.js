import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import NavMain from "./components/organisms/NavMain";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <NavMain />
      </NavigationContainer>
    </AuthProvider>
  );
}
