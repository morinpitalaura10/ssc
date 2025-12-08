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
import { GlobalStyles } from "../styles/GlobalStyles";
import { AuthContext } from "../context/AuthContext";
import HeaderPrimary from "../components/atom/HeaderPrimary";
import FormField from "../components/molecules/FormField";
import CardBg from "../components/molecules/CardBg";
import NavBotPublic from "../components/organisms/NavBotPublic";

const Login = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin@uin.ac.id" && password === "admin") {
      setUser({ role: "admin", name: "Administrator" });

    } else if (username === "mhs@uin.ac.id" && password === "mhs") {
      setUser({ role: "mahasiswa", name: "Mahasiswa Aktif" });

    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <View style={GlobalStyles.container}>
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

            <FormField label="Email" value={username} onChangeText={setUsername} />
            <FormField label="Password" value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity style={GlobalStyles.btnPrimary} onPress={handleLogin}>
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
