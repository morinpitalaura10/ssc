import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
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

const Login = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login ditekan"); // ✅ test apakah fungsi terpanggil

    if (username === "admin@uin.ac.id" && password === "admin") {
      console.log("Admin masuk");
      setUser({ role: "admin", name: "Administrator" });
      navigation.replace("DashboardAdmin");
    } else if (username === "mhs@uin.ac.id" && password === "mhs") {
      console.log("Mahasiswa masuk");
      setUser({ role: "mahasiswa", name: "Mahasiswa Aktif" });
      navigation.replace("DashboardMhs");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      {/* Header */}
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
            <View style={GlobalStyles.loginLogoBox}>
              <Image
                source={require("../assets/icon.png")}
                style={GlobalStyles.loginLogo}
                resizeMode="contain"
              />
            </View>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              style={GlobalStyles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={GlobalStyles.input}
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
