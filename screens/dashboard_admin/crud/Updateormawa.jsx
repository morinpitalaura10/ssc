import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import CardBg from "../../../components/molecules/CardBg";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import FormField from "../../../components/molecules/FormField";

const UpdateOrmawa = ({ navigation }) => {
  const [data, setData] = useState({
    namaOrmawa: "BEM Fakultas Sains",
    ketua: "Laura",
    deskripsi: "Organisasi mahasiswa aktif di bidang akademik.",
    kontak: "laura@uin.ac.id",
  });

  const handleUpload = () => alert("Upload gambar belum aktif — UI saja");

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="UPDATE ORMAWA" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <CardBg>
          <Text style={GlobalStyles.sectionTitle}>Perbarui Data ORMAWA</Text>

          <FormField label="Nama ORMAWA" value={data.namaOrmawa} onChangeText={(t) => setData({ ...data, namaOrmawa: t })} />
          <FormField label="Nama Ketua" value={data.ketua} onChangeText={(t) => setData({ ...data, ketua: t })} />
          <FormField label="Deskripsi" value={data.deskripsi} onChangeText={(t) => setData({ ...data, deskripsi: t })} showUpload onUpload={handleUpload} />
          <FormField label="Kontak" value={data.kontak} onChangeText={(t) => setData({ ...data, kontak: t })} />

          <TouchableOpacity style={[GlobalStyles.btnPrimary, { marginTop: 20 }]} onPress={() => navigation.navigate("CrudOrmawa")}>
            <Text style={GlobalStyles.btnText}>Update</Text>
          </TouchableOpacity>
        </CardBg>
      </ScrollView>
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default UpdateOrmawa;
