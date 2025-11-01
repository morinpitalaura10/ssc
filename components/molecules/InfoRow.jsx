// components/molecules/InfoRow.jsx
import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const InfoRow = ({ label, value }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: Colors.grayLight,
    }}
  >
    <Text style={{ color: Colors.textPrimary, fontWeight: "600" }}>{label}</Text>
    <Text style={{ color: Colors.textSecondary }}>{value}</Text>
  </View>
);

export default InfoRow;
