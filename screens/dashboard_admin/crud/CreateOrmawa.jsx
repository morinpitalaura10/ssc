import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from "react-native";
import { GlobalStyles, Colors } from "../../../styles/GlobalStyles";
import CardBg from "../../../components/molecules/CardBg";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import FormField from "../../../components/molecules/FormField";
import { supabase } from "../../../utils/supabase";
import * as ImagePicker from 'expo-image-picker';


const CreateOrmawa = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    namaOrmawa: "",
    ketua: "",
    deskripsi: "",
    kontak: "",
    gambarOrmawa: null
  });


  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });


    if (!result.canceled) {
      setData({ ...data, gambarOrmawa: result.assets[0].uri });
    }
  };


  const uploadImage = async (uri) => {
    if (!uri) return null;
    const ext = uri.substring(uri.lastIndexOf('.') + 1);
    const fileName = `ormawa_${Date.now()}.${ext}`;


    // Convert to formData for Supabase upload
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: fileName,
      type: `image/${ext}`
    });


    const { data: uploadData, error } = await supabase.storage
      .from('logo_ormawa')
      .upload(fileName, formData, {
        cacheControl: '3600',
        upsert: false
      });


    if (error) throw error;


    const { data: publicUrlData } = supabase.storage
      .from('logo_ormawa')
      .getPublicUrl(fileName);


    return publicUrlData.publicUrl;
  };


  const handleSave = async () => {
    // 1. Validasi Input
    if (!data.namaOrmawa || !data.ketua || !data.deskripsi || !data.kontak) {
      Alert.alert("Error", "Semua field harus diisi!");
      return;
    }


    setLoading(true);


    try {
      // 2. Upload Gambar (Jika ada)
      let imageUrl = null;
      if (data.gambarOrmawa) {
        imageUrl = await uploadImage(data.gambarOrmawa);
      }


      // 3. Insert ke Supabase
      const { error } = await supabase
        .from('tbl_ormawa')
        .insert([
          {
            nama_ormawa: data.namaOrmawa,
            ketua: data.ketua,
            desc: data.deskripsi,
            contact: data.kontak,
            logo: imageUrl // Masukkan URL gambar
          },
        ]);


      if (error) {
        throw error;
      }


      // 4. Sukses
      Alert.alert("Sukses", "Data Ormawa berhasil ditambahkan!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);


    } catch (err) {
      console.error(err);
      Alert.alert("Gagal", "Terjadi kesalahan saat menyimpan data: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="TAMBAH ORMAWA" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <CardBg>
          <Text style={GlobalStyles.sectionTitle}>Tambah Data ORMAWA</Text>


          {/* Preview Image */}
          {data.gambarOrmawa ? (
            <View style={{ alignItems: 'center', marginBottom: 15 }}>
              <Image
                source={{ uri: data.gambarOrmawa }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            </View>
          ) : null}


          <FormField label="Nama ORMAWA" value={data.namaOrmawa} onChangeText={(t) => setData({ ...data, namaOrmawa: t })} />
          <FormField label="Nama Ketua" value={data.ketua} onChangeText={(t) => setData({ ...data, ketua: t })} />


          <FormField
            label="Deskripsi"
            value={data.deskripsi}
            onChangeText={(t) => setData({ ...data, deskripsi: t })}
            showUpload
            onUpload={handlePickImage}
          />
          <Text style={{ fontSize: 10, color: '#aaa', fontStyle: 'italic', marginBottom: 10, marginTop: -5 }}>*Klik ikon upload untuk menambah gambar</Text>


          <FormField label="Kontak" value={data.kontak} onChangeText={(t) => setData({ ...data, kontak: t })} />


          <TouchableOpacity
            style={[GlobalStyles.btnPrimary, { marginTop: 20, opacity: loading ? 0.7 : 1 }]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={GlobalStyles.btnText}>Simpan</Text>
            )}
          </TouchableOpacity>
        </CardBg>
      </ScrollView>
      <NavBotAdmin navigation={navigation} />
    </View>
  );
};


export default CreateOrmawa;
