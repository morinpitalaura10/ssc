import React, { useCallback, useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotAdmin from "../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import { supabase } from "../../utils/supabase";
import { AuthContext } from "../../context/AuthContext";

const ProfileAdmin = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");

    const uname = user?.username?.trim();
    if (!uname) {
      setErrorMsg("User belum login / username tidak ditemukan.");
      setRow(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tb_user")
      .select("id_user, nama_lengkap, username, role, nope, jurusan, img_pp")
      .eq("username", uname)
      .single();

    if (error) {
      setErrorMsg(error.message);
      setRow(null);
    } else {
      setRow(data);
    }

    setLoading(false);
  }, [user?.username]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const Field = ({ label, value }) => (
    <View style={GlobalStyles.profileField}>
      <Text style={GlobalStyles.fieldLabel}>{label}</Text>
      <View style={GlobalStyles.fieldBox}>
        <Text style={GlobalStyles.fieldValue}>{value || "-"}</Text>
      </View>
    </View>
  );

  const isHttp = (v) => typeof v === "string" && v.startsWith("http");

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="PROFIL" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        {loading ? (
          <View style={GlobalStyles.centerContent}>
            <ActivityIndicator size="small" />
          </View>
        ) : errorMsg ? (
          <CardBg>
            <Text style={GlobalStyles.errorText}>{errorMsg}</Text>

            <TouchableOpacity
              style={GlobalStyles.primaryBtn}
              activeOpacity={0.85}
              onPress={fetchProfile}
            >
              <Text style={GlobalStyles.primaryBtnText}>Coba Lagi</Text>
            </TouchableOpacity>
          </CardBg>
        ) : (
          <CardBg>
            {/* ✅ FOTO PROFIL (tanpa nampilin link) */}
            <View style={GlobalStyles.profileImageContainer}>
              {isHttp(row?.img_pp) ? (
                <Image
                  source={{ uri: row.img_pp }}
                  style={GlobalStyles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={GlobalStyles.readAvatarFallback}>
                  <Ionicons name="person" size={42} color={Colors.primary} />
                </View>
              )}
            </View>

            <Field label="ID User" value={String(row?.id_user ?? "")} />
            <Field label="Nama Lengkap" value={row?.nama_lengkap} />
            <Field label="Username" value={row?.username} />
            <Field label="Role" value={row?.role} />
            <Field label="No. HP" value={row?.nope} />
            <Field label="Jurusan" value={row?.jurusan} />

            <TouchableOpacity
              style={GlobalStyles.primaryBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("EditProfileAdmin")}
            >
              <Text style={GlobalStyles.primaryBtnText}>Edit Profil</Text>
            </TouchableOpacity>
          </CardBg>
        )}
      </ScrollView>

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default ProfileAdmin;
