import React, { useCallback, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../styles/GlobalStyles";
import NavBotMhs from "../../components/organisms/NavBotMhs";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import { supabase } from "../../utils/supabase";
import { AuthContext } from "../../context/AuthContext";

const DashboardMhs = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [nama, setNama] = useState(user?.name || "Mahasiswa");
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const isHttp = (v) => typeof v === "string" && v.startsWith("http");

  const formatTanggal = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getIcon = (type) => {
    if (type === "ormawa") return "school";
    if (type === "ukm") return "people-circle";
    return "calendar";
  };

  const fetchNama = useCallback(async () => {
    const uname = user?.username?.trim();
    if (!uname) {
      setNama(user?.name || "Mahasiswa");
      return;
    }

    const { data, error } = await supabase
      .from("tb_user")
      .select("nama_lengkap")
      .eq("username", uname)
      .maybeSingle();

    if (!error) setNama(data?.nama_lengkap || user?.name || "Mahasiswa");
    else setNama(user?.name || "Mahasiswa");
  }, [user?.username, user?.name]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const [acaraRes, ormawaRes, ukmRes] = await Promise.all([
        supabase
          .from("tb_acara")
          .select("id_acara, judul_acara, deskripsi, tanggal, img_acara, created_at")
          .order("created_at", { ascending: false }),

        supabase
          .from("tb_ormawa")
          .select("id_ormawa, nama_ormawa, deskripsi_ormawa, logo_ormawa, created_at")
          .order("created_at", { ascending: false }),

        supabase
          .from("tb_ukm")
          .select("id_ukm, nama_ukm, deskripsi_ukm, logo_ukm, created_at")
          .order("created_at", { ascending: false }),
      ]);

      if (acaraRes.error) throw acaraRes.error;
      if (ormawaRes.error) throw ormawaRes.error;
      if (ukmRes.error) throw ukmRes.error;

      const acaraCards = (acaraRes.data || []).map((r) => ({
        key: `acara-${r.id_acara}`,
        type: "acara",
        id: r.id_acara,
        title: r.judul_acara,
        desc: r.deskripsi,
        img: r.img_acara,
        subtitle: `📅 ${formatTanggal(r.tanggal)}`,
        created_at: r.created_at,
      }));

      const ormawaCards = (ormawaRes.data || []).map((r) => ({
        key: `ormawa-${r.id_ormawa}`,
        type: "ormawa",
        id: r.id_ormawa,
        title: r.nama_ormawa,
        desc: r.deskripsi_ormawa,
        img: r.logo_ormawa,
        subtitle: "🏫 ORMAWA",
        created_at: r.created_at,
      }));

      const ukmCards = (ukmRes.data || []).map((r) => ({
        key: `ukm-${r.id_ukm}`,
        type: "ukm",
        id: r.id_ukm,
        title: r.nama_ukm,
        desc: r.deskripsi_ukm,
        img: r.logo_ukm,
        subtitle: "👥 UKM",
        created_at: r.created_at,
      }));

      const merged = [...acaraCards, ...ormawaCards, ...ukmCards].sort((a, b) => {
        const ta = new Date(a.created_at || 0).getTime();
        const tb = new Date(b.created_at || 0).getTime();
        return tb - ta;
      });

      setCards(merged);
    } catch (e) {
      setErrorMsg(e?.message || "Gagal ambil data");
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNama();
    fetchAll();
  }, [fetchNama, fetchAll]);

  const handlePress = (item) => {
    if (item.type === "acara") navigation.navigate("ReadAcaraHome", { id_acara: item.id });
    if (item.type === "ormawa") navigation.navigate("ReadOrmawaHome", { id_ormawa: item.id });
    if (item.type === "ukm") navigation.navigate("ReadUkmHome", { id_ukm: item.id });
  };

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="MAHASISWA" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        <Text style={GlobalStyles.welcomeText}>Selamat Datang, {nama} !</Text>

        {loading ? (
          <View style={GlobalStyles.centerContent}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <View style={GlobalStyles.homeListGap}>
            {!!errorMsg ? <Text style={GlobalStyles.errorText}>{errorMsg}</Text> : null}

            {cards.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={GlobalStyles.cardHomeWithImage}
                activeOpacity={0.9}
                onPress={() => handlePress(item)}
              >
                {isHttp(item.img) ? (
                  <Image source={{ uri: item.img }} style={GlobalStyles.cardImage} />
                ) : (
                  <View style={GlobalStyles.cardImageFallback}>
                    <Ionicons name={getIcon(item.type)} size={46} color={Colors.primary} />
                  </View>
                )}

                {/* pakai style admin biar gak inline */}
                <View style={GlobalStyles.cardAdminContent}>
                  <Text style={GlobalStyles.cardAdminTitle}>{item.title || "-"}</Text>
                  <Text style={GlobalStyles.cardAdminDesc}>{item.subtitle || "-"}</Text>
                  <Text style={GlobalStyles.cardAdminDesc} numberOfLines={3}>
                    {item.desc || "-"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {cards.length === 0 && !errorMsg ? (
              <Text style={GlobalStyles.emptyText}>Belum ada data.</Text>
            ) : null}
          </View>
        )}
      </ScrollView>

      <NavBotMhs navigation={navigation} />
    </View>
  );
};

export default DashboardMhs;
