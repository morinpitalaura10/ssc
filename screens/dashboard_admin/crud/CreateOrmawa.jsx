import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import CardBg from "../../../components/molecules/CardBg";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import FormField from "../../../components/molecules/FormField";

const CreateOrmawa = ({ navigation }) => {
  const [data, setData] = useState({
    namaOrmawa: "",
    ketua: "",
    deskripsi: "",
    kontak: "",
  });

  const handleUpload = () => alert("Upload gambar belum aktif — UI saja");

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="TAMBAH ORMAWA" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <CardBg>
          <Text style={GlobalStyles.sectionTitle}>Tambah Data ORMAWA</Text>

          <FormField label="Nama ORMAWA" value={data.namaOrmawa} onChangeText={(t) => setData({ ...data, namaOrmawa: t })} />
          <FormField label="Nama Ketua" value={data.ketua} onChangeText={(t) => setData({ ...data, ketua: t })} />
          <FormField label="Deskripsi" value={data.deskripsi} onChangeText={(t) => setData({ ...data, deskripsi: t })} showUpload onUpload={handleUpload} />
          <FormField label="Kontak" value={data.kontak} onChangeText={(t) => setData({ ...data, kontak: t })} />

          <TouchableOpacity style={[GlobalStyles.btnPrimary, { marginTop: 20 }]} onPress={() => navigation.navigate("CrudOrmawa")}>
            <Text style={GlobalStyles.btnText}>Simpan</Text>
          </TouchableOpacity>
        </CardBg>
      </ScrollView>
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default CreateOrmawa;
