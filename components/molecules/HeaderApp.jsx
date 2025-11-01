// components/molecules/HeaderApp.jsx
import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const HeaderApp = ({ title }) => (
  <View
    style={{
      paddingVertical: 15,
      backgroundColor: Colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    }}
  >
    <Text
      style={{
        color: Colors.white,
        fontWeight: "700",
        fontSize: 20,
        textTransform: "uppercase",
      }}
    >
      {title}
    </Text>
  </View>
);

export default HeaderApp;
