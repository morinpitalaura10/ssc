// components/molecules/CardKegiatan.jsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const CardKegiatan = ({ title, desc, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      backgroundColor: Colors.white,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 3,
    }}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: "700",
        color: Colors.primary,
        marginBottom: 4,
      }}
    >
      {title}
    </Text>
    <Text style={{ fontSize: 14, color: Colors.textSecondary }}>{desc}</Text>
  </TouchableOpacity>
);

export default CardKegiatan;
