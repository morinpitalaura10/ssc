import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import CardBg from "../../components/molecules/CardBg";
import NavBotMhs from "../../components/organisms/NavBotMhs";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import { supabase } from "../../utils/supabase";
import { AuthContext } from "../../context/AuthContext";

const ProfileMhs = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [row, setRow] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [imgError, setImgError] = useState(false);

  const username = user?.username?.trim();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    setImgError(false);

    if (!username) {
      setRow(null);
      setErrorMsg("Username belum ada (user belum login / belum terset).");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tb_user")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      setRow(null);
      setErrorMsg(error.message);
    } else {
      setRow(data || null);
      if (!data) setErrorMsg("Data profil tidak ditemukan.");
    }

    setLoading(false);
  }, [username]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const labelMap = useMemo(
    () => ({
      id_user: "ID User",
      nim: "NIM",
      nama_lengkap: "Nama Lengkap",
      nama_panggilan: "Nama Panggilan",
      username: "Username",
      nope: "No. HP",
      role: "Role",
      jurusan: "Jurusan",
      ttl: "Tempat, Tanggal Lahir",
      created_at: "Dibuat",
      updated_at: "Diupdate",
    }),
    []
  );

  const priorityKeys = useMemo(
    () => ["nim", "nama_lengkap", "nama_panggilan", "username", "role", "jurusan", "nope", "ttl"],
    []
  );

  const entries = useMemo(() => {
    if (!row) return [];

    // ❌ jangan tampilkan password & img_pp
    const all = Object.entries(row).filter(
      ([k]) => k !== "password" && k !== "img_pp"
    );

    const map = new Map(all);

    const ordered = [];
    priorityKeys.forEach((k) => {
      if (map.has(k)) {
        ordered.push([k, map.get(k)]);
        map.delete(k);
      }
    });

    map.forEach((v, k) => ordered.push([k, v]));
    return ordered;
  }, [row, priorityKeys]);

  const Avatar = () => {
    // tetap pakai img_pp untuk gambar aja, tapi tidak ditampilkan sebagai field
    if (row?.img_pp && !imgError) {
      return (
        <Image
          source={{ uri: row.img_pp }}
          style={GlobalStyles.profileImage}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
      );
    }

    return (
      <View style={GlobalStyles.profileImage}>
        <Ionicons name="person" size={60} color={Colors.primary} />
      </View>
    );
  };

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="PROFIL MAHASISWA" />

      {loading ? (
        <View style={GlobalStyles.centerContent}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollContainer}
        >
          {!!errorMsg ? <Text style={GlobalStyles.errorText}>{errorMsg}</Text> : null}

          <CardBg>
            <View style={GlobalStyles.profileImageContainer}>
              <Avatar />
            </View>

            {entries.map(([key, value], index) => (
              <View key={`${key}-${index}`} style={GlobalStyles.profileField}>
                <Text style={GlobalStyles.fieldLabel}>{labelMap[key] || key}</Text>

                <View style={GlobalStyles.fieldBox}>
                  <Text style={GlobalStyles.fieldValue}>
                    {value === null || value === undefined || value === "" ? "-" : String(value)}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={GlobalStyles.btnPrimary}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("UpdateProfileMhs", { id_user: row?.id_user })}
              disabled={!row?.id_user}
            >
              <Text style={GlobalStyles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
          </CardBg>
        </ScrollView>
      )}

      <NavBotMhs navigation={navigation} />
    </View>
  );
};

export default ProfileMhs;
