import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Colors } from "../../styles/GlobalStyles";

const CardBg = ({ children, onPress, style }) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.card, style]}
    >
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default CardBg;
