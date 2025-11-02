import React from "react";
import { View, Text, Image } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";

const HeaderPrimary = ({ title }) => {
  return (
    <View
      style={[
        GlobalStyles.headerPrimary,
        { flexDirection: "row", justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 30, height: 30, marginRight: 10 }}
        resizeMode="contain"
      />
      <Text style={GlobalStyles.headerTitle2}>{title}</Text>
    </View>
  );
};

export default HeaderPrimary;
