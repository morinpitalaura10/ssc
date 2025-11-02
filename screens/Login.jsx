// screens/Login.jsx
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Colors, GlobalStyles } from "../styles/GlobalStyles";
import { AuthContext } from "../context/AuthContext";
import NavBotPublic from "../components/organisms/NavBotPublic";
import CardBg from "../components/molecules/CardBg";
import HeaderPrimary from "../components/atom/HeaderPrimary";
import InputField from "../components/atom/InputField"; // ✅ gunakan komponen global input

const Login = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin@uin.ac.id" && password === "admin") {
      setUser({ role: "admin", name: "Administrator" });
      navigation.replace("DashboardAdmin");
    } else if (username === "mhs@uin.ac.id" && password === "mhs") {
      setUser({ role: "mahasiswa", name: "Mahasiswa Aktif" });
      navigation.replace("DashboardMhs");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {/* HEADER */}
      <HeaderPrimary title="LOGIN SIMAK-UIN" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollContainer}
        >
          <CardBg style={{ marginHorizontal: 25 }}>
            {/* LOGO */}
            <View style={GlobalStyles.loginLogoBox}>
              <Image
                source={require("../assets/icon.png")}
                style={GlobalStyles.loginLogo}
                resizeMode="contain"
              />
            </View>

            {/* FORM LOGIN */}
            <InputField
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
            />

            <InputField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={GlobalStyles.btnPrimary}
              onPress={handleLogin}
            >
              <Text style={GlobalStyles.btnText}>Masuk</Text>
            </TouchableOpacity>
          </CardBg>
        </ScrollView>
      </KeyboardAvoidingView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default Login;
