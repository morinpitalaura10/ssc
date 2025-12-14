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

const ReadOrmawaHome = ({ navigation, route }) => {
  const { id_ormawa } = route.params || {};

  const [row, setRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");

    if (!id_ormawa) {
      setErrorMsg("ID ormawa tidak ditemukan.");
      setRow(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("tb_ormawa")
      .select(
        "id_ormawa, nama_ormawa, kepanjangan, nama_ketum, jumlah_anggota, total_depart, deskripsi_ormawa, since, logo_ormawa"
      )
      .eq("id_ormawa", id_ormawa)
      .single();

    if (error) {
      setErrorMsg(error.message);
      setRow(null);
    } else {
      setRow(data);
    }

    setLoading(false);
  }, [id_ormawa]);

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
      <HeaderPrimary title="DETAIL ORMAWA" />

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
            {/* Logo */}
            <View style={GlobalStyles.readAvatarWrap}>
              {isHttp(row?.logo_ormawa) ? (
                <Image source={{ uri: row.logo_ormawa }} style={GlobalStyles.readAvatar} />
              ) : (
                <View style={GlobalStyles.readAvatarFallback}>
                  <Ionicons name="school" size={38} color={Colors.primary} />
                </View>
              )}
            </View>

            <Field label="ID Ormawa" value={String(row?.id_ormawa ?? "")} />
            <Field label="Nama Ormawa" value={row?.nama_ormawa || "-"} />
            <Field label="Kepanjangan" value={row?.kepanjangan || "-"} />
            <Field label="Nama Ketum" value={row?.nama_ketum || "-"} />
            <Field label="Jumlah Anggota" value={row?.jumlah_anggota ?? "-"} />
            <Field label="Total Depart" value={row?.total_depart ?? "-"} />
            <Field label="Since" value={formatDate(row?.since)} />
            <Field label="Deskripsi" value={row?.deskripsi_ormawa || "-"} />

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

export default ReadOrmawaHome;
