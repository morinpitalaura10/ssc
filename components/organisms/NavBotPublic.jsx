// components/organisms/NavBotPublic.jsx
import React from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../styles/GlobalStyles";

const NavBotPublic = ({ navigation }) => {
  const navItems = [
    { label: "Home", icon: "home", screen: "PublicHome" },
    { label: "About", icon: "information-circle", screen: "AboutHome" },
    { label: "Login", icon: "log-in", screen: "Login" },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: Colors.primary,
        paddingVertical: Platform.OS === "ios" ? 12 : 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 10,
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 10,
      }}
    >
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.label}
          onPress={() => navigation.navigate(item.screen)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Ionicons name={item.icon} size={22} color={Colors.white} />
          <Text
            style={{
              color: Colors.white,
              fontSize: 13,
              marginTop: 4,
              fontWeight: "500",
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NavBotPublic;
