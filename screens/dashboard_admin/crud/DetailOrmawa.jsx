import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, RefreshControl } from "react-native";
import { GlobalStyles, Colors } from "../../../styles/GlobalStyles";
import CardBg from "../../../components/molecules/CardBg";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import { supabase } from "../../../utils/supabase";
import { useFocusEffect } from "@react-navigation/native";


const DetailOrmawa = ({ navigation }) => {
  const [listOrmawa, setListOrmawa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  const fetchOrmawa = async () => {
    try {
      const { data, error } = await supabase
        .from('tbl_ormawa')
        .select('*')
        .order('created_at', { ascending: false });


      if (error) throw error;
      setListOrmawa(data || []);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil data: " + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  useFocusEffect(
    useCallback(() => {
      fetchOrmawa();
    }, [])
  );


  const onRefresh = () => {
    setRefreshing(true);
    fetchOrmawa();
  };


  const handleDelete = async (id, nama) => {
    Alert.alert(
      "Konfirmasi Hapus",
      `Apakah Anda yakin ingin menghapus ${nama}?`,
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const { error } = await supabase.from("tbl_ormawa").delete().eq("id", id);
              if (error) throw error;
              alert("Data berhasil dihapus!");
              fetchOrmawa(); // Refresh list
            } catch (err) {
              alert("Gagal menghapus: " + err.message);
              setLoading(false);
            }
          },
        },
      ]
    );
  };


  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="DETAIL ORMAWA" />


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
        ) : listOrmawa.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ color: Colors.textSecondary }}>Belum ada data Ormawa.</Text>
          </View>
        ) : (
          listOrmawa.map((item, index) => (
            <CardBg key={item.id || index} style={{ marginBottom: 20 }}>
              <Text style={GlobalStyles.sectionTitle}>Data #{index + 1}</Text>


              {/* 🖼️ Foto/logo default */}
              <View style={{ alignItems: "center", marginVertical: 15 }}>
                <Image
                  source={item.logo ? { uri: item.logo } : require("../../../assets/icon.png")}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 15,
                    marginBottom: 10,
                  }}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: Colors.primary,
                    textAlign: "center"
                  }}
                >
                  {item.nama_ormawa}
                </Text>
              </View>


              {/* === DATA DETAIL === */}
              <View style={GlobalStyles.profileField}>
                <Text style={GlobalStyles.fieldLabel}>Nama Ketua</Text>
                <View style={GlobalStyles.fieldBox}>
                  <Text style={GlobalStyles.fieldValue}>{item.ketua}</Text>
                </View>
              </View>


              <View style={GlobalStyles.profileField}>
                <Text style={GlobalStyles.fieldLabel}>Deskripsi</Text>
                <View style={GlobalStyles.fieldBox}>
                  <Text style={GlobalStyles.fieldValue}>{item.desc}</Text>
                </View>
              </View>


              <View style={GlobalStyles.profileField}>
                <Text style={GlobalStyles.fieldLabel}>Kontak</Text>
                <View style={GlobalStyles.fieldBox}>
                  <Text style={GlobalStyles.fieldValue}>{item.contact}</Text>
                </View>
              </View>


              {/* === ACTION BUTTONS === */}
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: Colors.secondary, // atau warna lain misal kuning/biru
                    padding: 10,
                    borderRadius: 8,
                    marginRight: 5,
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("UpdateOrmawa", { item })}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#e74c3c", // Merah delete
                    padding: 10,
                    borderRadius: 8,
                    marginLeft: 5,
                    alignItems: "center",
                  }}
                  onPress={() => handleDelete(item.id, item.nama_ormawa)}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
                </TouchableOpacity>
              </View>


            </CardBg>
          ))
        )}


        {/* Tombol kembali */}
        <TouchableOpacity
          style={[GlobalStyles.btnPrimary, { marginTop: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={GlobalStyles.btnText}>Kembali</Text>
        </TouchableOpacity>
      </ScrollView>


      <NavBotAdmin navigation={navigation} />
    </View>
  );
};


export default DetailOrmawa;