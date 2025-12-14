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
  Alert,
} from "react-native";
import { GlobalStyles } from "../styles/GlobalStyles";
import { AuthContext } from "../context/AuthContext";
import HeaderPrimary from "../components/atom/HeaderPrimary";
import FormField from "../components/molecules/FormField";
import CardBg from "../components/molecules/CardBg";
import NavBotPublic from "../components/organisms/NavBotPublic";
import { supabase } from "../utils/supabase"; // ✅ tambah ini

const Login = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Gagal", "Username dan password wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      // ✅ ambil 1 user yang cocok
      const { data, error } = await supabase
        .from("tb_user")
        .select("id_user, username, password, role, nama_lengkap")
        .eq("username", username.trim())
        .eq("password", password.trim())
        .maybeSingle();

      if (error) {
        Alert.alert("Gagal", error.message);
        return;
      }

      if (!data) {
        Alert.alert("Gagal", "Username atau password salah!");
        return;
      }

      // ✅ simpan ke context (buat routing role-based kamu)
      setUser({
        id_user: data.id_user,
        role: data.role, // "admin" / "mahasiswa"
        name: data.nama_lengkap || data.username,
        username: data.username,
      });

      // kalau kamu mau auto pindah halaman setelah login:
      // if (data.role === "admin") navigation.replace("AdminHome");
      // else navigation.replace("DashboardMhs");
    } finally {
      setLoading(false);
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

            <FormField label="Username" value={username} onChangeText={setUsername} />
            <FormField label="Password" value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity
              style={[GlobalStyles.btnPrimary, { opacity: loading ? 0.7 : 1 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={GlobalStyles.btnText}>{loading ? "Memproses..." : "Masuk"}</Text>
            </TouchableOpacity>
          </CardBg>
        </ScrollView>
      </KeyboardAvoidingView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default Login;
