import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import { supabase } from "../../../utils/supabase";

const CrudAcara = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAcara = useCallback(async () => {
    setErrorMsg("");

    const { data: rows, error } = await supabase
      .from("tb_acara")
      .select("id_acara, judul_acara, deskripsi, tanggal, created_at, img_acara")
      .order("id_acara", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setData([]);
    } else {
      setData(rows || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAcara();
  }, [fetchAcara]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAcara();
    setRefreshing(false);
  };

  const handleDelete = (row) => {
    Alert.alert(
      "Hapus Acara",
      `Yakin hapus "${row.judul_acara}"?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("tb_acara")
              .delete()
              .eq("id_acara", row.id_acara);

            if (error) {
              Alert.alert("Gagal", error.message);
              return;
            }
            fetchAcara();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const formatTanggal = (value) => {
    if (!value) return "-";
    // Supabase timestamp biasanya ISO string
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const Poster = ({ img }) => {
    if (typeof img === "string" && img.startsWith("http")) {
      return <Image source={{ uri: img }} style={GlobalStyles.mhsAvatar} />;
      // pakai style avatar biar konsisten card (persegi/rounded tergantung style kamu)
    }
    return (
      <View style={GlobalStyles.mhsAvatarFallback}>
        <Ionicons name="calendar" size={26} color={Colors.primary} />
      </View>
    );
  };

  const AcaraCard = ({ item }) => (
    <View style={GlobalStyles.mhsCard}>
      <Poster img={item.img_acara} />

      <View style={GlobalStyles.mhsInfo}>
        <Text style={GlobalStyles.mhsName}>{item.judul_acara || "-"}</Text>

        <Text style={GlobalStyles.mhsMeta}>
          Tanggal: {formatTanggal(item.tanggal)}
        </Text>

        <Text style={GlobalStyles.mhsMeta} numberOfLines={2}>
          {item.deskripsi || "-"}
        </Text>

        <View style={GlobalStyles.mhsActionsRow}>
          <TouchableOpacity
            style={GlobalStyles.mhsActionBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("ReadAcara", { id_acara: item.id_acara })
            }
          >
            <Ionicons name="eye" size={16} color={Colors.primary} />
            <Text style={GlobalStyles.mhsActionText}>Read</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.mhsActionBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("UpdateAcara", { id_acara: item.id_acara })
            }
          >
            <Ionicons name="create" size={16} color={Colors.primary} />
            <Text style={GlobalStyles.mhsActionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.mhsDeleteBtn}
            activeOpacity={0.8}
            onPress={() => handleDelete(item)}
          >
            <Ionicons name="trash" size={16} color={Colors.danger} />
            <Text style={GlobalStyles.mhsDeleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={GlobalStyles.emptyWrap}>
      <Ionicons name="information-circle-outline" size={42} color={Colors.primary} />
      <Text style={GlobalStyles.emptyText}>Data tidak ditemukan</Text>
      <Text style={GlobalStyles.emptySubText}>Tarik ke bawah untuk refresh.</Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="KELOLA ACARA" />

      {/* Sticky Add Button */}
      <View style={GlobalStyles.stickyTopBar}>
        <TouchableOpacity
          style={GlobalStyles.addBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("CreateAcara")}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={GlobalStyles.addBtnText}>Tambah Acara</Text>
        </TouchableOpacity>

        {!!errorMsg && <Text style={GlobalStyles.errorText}>{errorMsg}</Text>}
      </View>

      {loading ? (
        <View style={GlobalStyles.centerContent}>
          <ActivityIndicator size="small" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id_acara)}
          renderItem={({ item }) => <AcaraCard item={item} />}
          contentContainerStyle={[
            GlobalStyles.listContainer,
            data.length === 0 && GlobalStyles.listContainerEmpty,
          ]}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      )}

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default CrudAcara;
