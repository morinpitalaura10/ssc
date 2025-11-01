import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../styles/GlobalStyles";
import { AuthContext } from "../../context/AuthContext";

const NavBotAdmin = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [showSnack, setShowSnack] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // ✅ handleLogout pasti jalan di web & mobile
  const handleLogout = () => {
    setUser(null);

    // tampilkan snackbar
    setShowSnack(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // hilangkan snackbar setelah 2,5 detik
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowSnack(false));
    }, 2500);

    // pindah ke PublicHome
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "PublicHome" }],
      });
      navigation.navigate("PublicHome");
    }, 150);
  };

  const navItems = [
    { label: "Dashboard", icon: "grid", screen: "DashboardAdmin" },
    { label: "Profil", icon: "person-circle", screen: "ProfileAdmin" },
    { label: "Logout", icon: "log-out", action: handleLogout },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: Colors.primary,
          paddingVertical: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: "absolute",
          bottom: 0,
          width: "100%",
          elevation: 10,
          zIndex: 10,
        }}
      >
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() =>
              item.action
                ? item.action()
                : navigation.navigate(item.screen)
            }
            style={{ alignItems: "center" }}
          >
            <Ionicons name={item.icon} size={22} color={Colors.white} />
            <Text
              style={{
                color: Colors.white,
                fontSize: 12,
                marginTop: 4,
                fontWeight: "600",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Snackbar muncul di bawah */}
      {showSnack && (
        <Animated.View
          style={[
            GlobalStyles.snackbar,
            {
              backgroundColor: Colors.primary,
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={[GlobalStyles.snackbarText, { color: Colors.white }]}>
            ✅ Berhasil logout dari akun admin
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default NavBotAdmin;
