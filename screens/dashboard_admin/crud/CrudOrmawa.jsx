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

const CrudOrmawa = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrmawa = useCallback(async () => {
    setErrorMsg("");

    const { data: rows, error } = await supabase
      .from("tb_ormawa")
      .select(
        "id_ormawa, nama_ormawa, kepanjangan, nama_ketum, jumlah_anggota, total_depart, deskripsi_ormawa, logo_ormawa, since, created_at"
      )
      .order("id_ormawa", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setData([]);
    } else {
      setData(rows || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrmawa();
  }, [fetchOrmawa]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrmawa();
    setRefreshing(false);
  };

  const handleDelete = (row) => {
    Alert.alert(
      "Hapus Ormawa",
      `Yakin hapus "${row.nama_ormawa || "Ormawa ini"}"?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("tb_ormawa")
              .delete()
              .eq("id_ormawa", row.id_ormawa);

            if (error) {
              Alert.alert("Gagal", error.message);
              return;
            }
            fetchOrmawa();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const formatSince = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.gethTime?.())) return String(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Logo pakai avatar style yang sama (biar layout sama persis CrudAcara)
  const Logo = ({ img }) => {
    if (typeof img === "string" && img.startsWith("http")) {
      return <Image source={{ uri: img }} style={GlobalStyles.mhsAvatar} />;
    }
    return (
      <View style={GlobalStyles.mhsAvatarFallback}>
        <Ionicons name="people" size={26} color={Colors.primary} />
      </View>
    );
  };

  const OrmawaCard = ({ item }) => (
    <View style={GlobalStyles.mhsCard}>
      <Logo img={item.logo_ormawa} />

      <View style={GlobalStyles.mhsInfo}>
        <Text style={GlobalStyles.mhsName}>{item.nama_ormawa || "-"}</Text>

        <Text style={GlobalStyles.mhsMeta}>
          {item.kepanjangan ? item.kepanjangan : "-"}
        </Text>

        <Text style={GlobalStyles.mhsMeta}>
          Ketum: {item.nama_ketum || "-"}
        </Text>

        <Text style={GlobalStyles.mhsMeta}>
          Anggota: {item.jumlah_anggota ?? "-"} • Depart: {item.total_depart ?? "-"}
        </Text>

        <Text style={GlobalStyles.mhsMeta}>Since: {formatSince(item.since)}</Text>

        <Text style={GlobalStyles.mhsMeta} numberOfLines={2}>
          {item.deskripsi_ormawa || "-"}
        </Text>

        <View style={GlobalStyles.mhsActionsRow}>
          <TouchableOpacity
            style={GlobalStyles.mhsActionBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("ReadOrmawa", { id_ormawa: item.id_ormawa })
            }
          >
            <Ionicons name="eye" size={16} color={Colors.primary} />
            <Text style={GlobalStyles.mhsActionText}>Read</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.mhsActionBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("UpdateOrmawa", { id_ormawa: item.id_ormawa })
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
      <Ionicons
        name="information-circle-outline"
        size={42}
        color={Colors.primary}
      />
      <Text style={GlobalStyles.emptyText}>Data tidak ditemukan</Text>
      <Text style={GlobalStyles.emptySubText}>Tarik ke bawah untuk refresh.</Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="KELOLA ORMAWA" />

      <View style={GlobalStyles.stickyTopBar}>
        <TouchableOpacity
          style={GlobalStyles.addBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("CreateOrmawa")}
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={GlobalStyles.addBtnText}>Tambah Ormawa</Text>
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
          keyExtractor={(item) => String(item.id_ormawa)}
          renderItem={({ item }) => <OrmawaCard item={item} />}
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

export default CrudOrmawa;
