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

const CrudMahasiswa = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchMahasiswa = useCallback(async () => {
    setErrorMsg("");

    const { data: rows, error } = await supabase
      .from("tb_user")
      .select("id_user, nama_lengkap, username, jurusan, nope, role, img_pp")
      .order("id_user", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setData([]);
    } else {
      setData(rows || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMahasiswa();
  }, [fetchMahasiswa]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMahasiswa();
    setRefreshing(false);
  };

  const handleDelete = (row) => {
    Alert.alert(
      "Hapus Mahasiswa",
      `Yakin hapus ${row.nama_lengkap}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            const { error } = await supabase
              .from("tb_user")
              .delete()
              .eq("id_user", row.id_user);

            if (error) {
              Alert.alert("Gagal", error.message);
              return;
            }
            fetchMahasiswa();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const Avatar = ({ img }) => {
    if (typeof img === "string" && img.startsWith("http")) {
      return <Image source={{ uri: img }} style={GlobalStyles.mhsAvatar} />;
    }
    return (
      <View style={GlobalStyles.mhsAvatarFallback}>
        <Ionicons name="person" size={28} color={Colors.primary} />
      </View>
    );
  };

  const MahasiswaCard = ({ item }) => (
    <View style={GlobalStyles.mhsCard}>
      <Avatar img={item.img_pp} />

      <View style={GlobalStyles.mhsInfo}>
        <Text style={GlobalStyles.mhsName}>{item.nama_lengkap || "-"}</Text>
        <Text style={GlobalStyles.mhsMeta}>@{item.username || "-"}</Text>
        <Text style={GlobalStyles.mhsMeta}>
          {item.jurusan || "-"} • {item.nope || "-"}
        </Text>
        <Text style={GlobalStyles.mhsMeta}>Role: {item.role || "-"}</Text>

        <View style={GlobalStyles.mhsActionsRow}>
          <TouchableOpacity
            style={GlobalStyles.mhsActionBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("ReadMahasiswa", { id_user: item.id_user })
            }
          >
            <Ionicons name="eye" size={16} color={Colors.primary} />
            <Text style={GlobalStyles.mhsActionText}>Read</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.mhsActionBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("UpdateMahasiswa", { id_user: item.id_user })
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
      <Text style={GlobalStyles.emptySubText}>
        Tarik ke bawah untuk refresh.
      </Text>
    </View>
  );

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="KELOLA MAHASISWA" />

      {/* Sticky Add Button */}
      <View style={GlobalStyles.stickyTopBar}>
        <TouchableOpacity
          style={GlobalStyles.addBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("CreateMahasiswa")}
        >
          <Ionicons name="person-add" size={20} color="#fff" />
          <Text style={GlobalStyles.addBtnText}>Tambah Mahasiswa</Text>
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
          keyExtractor={(item) => String(item.id_user)}
          renderItem={({ item }) => <MahasiswaCard item={item} />}
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

export default CrudMahasiswa;
