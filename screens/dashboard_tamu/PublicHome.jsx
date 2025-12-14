import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles, Colors } from "../../styles/GlobalStyles";
import NavBotPublic from "../../components/organisms/NavBotPublic";
import HeaderPrimary from "../../components/atom/HeaderPrimary";
import { supabase } from "../../utils/supabase";

const PublicHome = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const [acaraRes, ormawaRes, ukmRes] = await Promise.all([
          supabase
            .from("tb_acara")
            .select("id_acara, judul_acara, deskripsi, img_acara, created_at")
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
          image: r.img_acara,
          created_at: r.created_at,
        }));

        const ormawaCards = (ormawaRes.data || []).map((r) => ({
          key: `ormawa-${r.id_ormawa}`,
          type: "ormawa",
          id: r.id_ormawa,
          title: r.nama_ormawa,
          desc: r.deskripsi_ormawa,
          image: r.logo_ormawa,
          created_at: r.created_at,
        }));

        const ukmCards = (ukmRes.data || []).map((r) => ({
          key: `ukm-${r.id_ukm}`,
          type: "ukm",
          id: r.id_ukm,
          title: r.nama_ukm,
          desc: r.deskripsi_ukm,
          image: r.logo_ukm,
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
    };

    fetchAll();
  }, []);

  const getIconName = (type) => {
    if (type === "ormawa") return "school";
    if (type === "ukm") return "people-circle";
    return "calendar";
  };

  const handlePress = (item) => {
    // sesuaikan nama screen kamu
    if (item.type === "acara") navigation.navigate("ReadAcaraHome", { id_acara: item.id });
    if (item.type === "ormawa") navigation.navigate("ReadOrmawaHome", { id_ormawa: item.id });
    if (item.type === "ukm") navigation.navigate("ReadUkmHome", { id_ukm: item.id });
  };

  const isValidHttpUrl = (v) => typeof v === "string" && v.startsWith("http");

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="SIMAK-UIN" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.scrollContainer}
      >
        {loading ? (
          <View style={GlobalStyles.centerContent}>
            <ActivityIndicator size="small" />
          </View>
        ) : (
          <View style={{ gap: 20 }}>
            {!!errorMsg ? <Text style={GlobalStyles.errorText}>{errorMsg}</Text> : null}

            {cards.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => handlePress(item)}
                style={GlobalStyles.cardHomeWithImage}
                activeOpacity={0.85}
              >
                {/* PURE DB IMAGE: kalau tidak ada URL -> tampil fallback */}
                {isValidHttpUrl(item.image) ? (
                  <Image source={{ uri: item.image }} style={GlobalStyles.cardImage} />
                ) : (
                  <View
                    style={[
                      GlobalStyles.cardImage,
                      {
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Ionicons name={getIconName(item.type)} size={46} color={Colors.primary} />
                  </View>
                )}

                <View style={GlobalStyles.cardContent}>
                  <Ionicons
                    name={getIconName(item.type)}
                    size={36}
                    color={Colors.primary}
                    style={GlobalStyles.cardIcon}
                  />
                  <View>
                    <Text style={GlobalStyles.cardTitle}>{item.title || "-"}</Text>
                    <Text style={GlobalStyles.cardText} numberOfLines={2}>
                      {item.desc || "-"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {cards.length === 0 && !errorMsg ? (
              <Text style={GlobalStyles.emptyText}>Belum ada data.</Text>
            ) : null}
          </View>
        )}
      </ScrollView>

      <NavBotPublic navigation={navigation} />
    </View>
  );
};

export default PublicHome;
