import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import { Colors, GlobalStyles } from "../../styles/GlobalStyles";
import { supabase } from "../../utils/supabase";

const ReadAcaraHome = ({ navigation, route }) => {
  const { id_acara } = route.params || {};

  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");

    if (!id_acara) {
      setErrorMsg("ID acara tidak ditemukan.");
      setRow(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tb_acara")
      .select("id_acara, judul_acara, deskripsi, tanggal, created_at, img_acara")
      .eq("id_acara", id_acara)
      .single();

    if (error) {
      setErrorMsg(error.message);
      setRow(null);
    } else {
      setRow(data);
    }

    setLoading(false);
  }, [id_acara]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const isHttp = (v) => typeof v === "string" && v.startsWith("http");

  const formatDate = (v) => {
    if (!v) return "-";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return String(v);
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  };

  const Field = ({ label, value }) => (
    <View style={GlobalStyles.readFieldWrap}>
      <Text style={GlobalStyles.readFieldLabel}>{label}</Text>
      <View style={GlobalStyles.readFieldBox}>
        <Text style={GlobalStyles.readFieldValue}>{value ?? "-"}</Text>
      </View>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="DETAIL ACARA" />

      {loading ? (
        <View style={GlobalStyles.centerContent}>
          <ActivityIndicator size="small" />
        </View>
      ) : errorMsg ? (
        <View style={GlobalStyles.emptyWrap}>
          <Ionicons name="alert-circle-outline" size={42} color={Colors.primary} />
          <Text style={GlobalStyles.emptyText}>Gagal memuat data</Text>
          <Text style={GlobalStyles.emptySubText}>{errorMsg}</Text>

          <TouchableOpacity
            style={GlobalStyles.primaryBtn}
            onPress={fetchDetail}
            activeOpacity={0.85}
          >
            <Text style={GlobalStyles.primaryBtnText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={GlobalStyles.readScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={GlobalStyles.formWrap}>
            {/* Poster */}
            <View style={GlobalStyles.readAvatarWrap}>
              {isHttp(row?.img_acara) ? (
                <Image source={{ uri: row.img_acara }} style={GlobalStyles.readAvatar} />
              ) : (
                <View style={GlobalStyles.readAvatarFallback}>
                  <Ionicons name="calendar" size={38} color={Colors.primary} />
                </View>
              )}
            </View>

            <Field label="ID Acara" value={String(row?.id_acara ?? "")} />
            <Field label="Judul Acara" value={row?.judul_acara || "-"} />
            <Field label="Tanggal" value={formatDate(row?.tanggal)} />
            <Field label="Deskripsi" value={row?.deskripsi || "-"} />

            <View style={GlobalStyles.readActionsRow}>
              <TouchableOpacity
                style={GlobalStyles.cancelBtn}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Text style={GlobalStyles.cancelBtnText}>Kembali</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default ReadAcaraHome;
