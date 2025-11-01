// components/molecules/ProfileInfo.jsx
import React from "react";
import { View, Text, Image } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const ProfileInfo = ({ photo, name, role, email }) => (
  <View
    style={{
      alignItems: "center",
      backgroundColor: Colors.white,
      marginVertical: 20,
      padding: 20,
      borderRadius: 12,
      elevation: 3,
    }}
  >
    {photo && (
      <Image
        source={{ uri: photo }}
        style={{
          width: 90,
          height: 90,
          borderRadius: 50,
          marginBottom: 10,
          borderWidth: 2,
          borderColor: Colors.primary,
        }}
      />
    )}
    <Text style={{ fontSize: 20, fontWeight: "700", color: Colors.primary }}>{name}</Text>
    <Text style={{ fontSize: 14, color: Colors.textSecondary, marginTop: 4 }}>{role}</Text>
    <Text style={{ fontSize: 14, color: Colors.textSecondary }}>{email}</Text>
  </View>
);

export default ProfileInfo;
