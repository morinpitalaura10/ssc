import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { supabase } from "../../../utils/supabase";

const CreateOrmawa = ({ navigation }) => {
  const [nama_ormawa, setNamaOrmawa] = useState("");
  const [kepanjangan, setKepanjangan] = useState("");
  const [nama_ketum, setNamaKetum] = useState("");
  const [jumlah_anggota, setJumlahAnggota] = useState("");
  const [total_depart, setTotalDepart] = useState("");
  const [deskripsi_ormawa, setDeskripsi] = useState("");

  // ✅ since pakai kalender
  const [since, setSince] = useState(""); // format: YYYY-MM-DD
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setSince(formatted);
    }
  };

  const [imageUri, setImageUri] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin ditolak", "Aplikasi butuh akses galeri untuk pilih gambar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setImageUri(result.assets[0].uri);
  };

  const decode = (base64) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const len = base64.length;
    const bufferLength = base64.length * 0.75;
    const arraybuffer = new ArrayBuffer(bufferLength);
    const bytes = new Uint8Array(arraybuffer);
    let p = 0;

    for (let i = 0; i < len; i += 4) {
      const encoded1 = chars.indexOf(base64[i]);
      const encoded2 = chars.indexOf(base64[i + 1]);
      const encoded3 = chars.indexOf(base64[i + 2]);
      const encoded4 = chars.indexOf(base64[i + 3]);

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      if (encoded3 !== 64) bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      if (encoded4 !== 64) bytes[p++] = ((encoded3 & 3) << 6) | encoded4;
    }
    return arraybuffer;
  };

  const uploadLogoToStorage = async (uri) => {
    setUploading(true);
    try {
      const fileName = `public/logo_ormawa${Date.now()}.jpg`;

      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
      const arrayBuffer = decode(base64);

      const { error: uploadError } = await supabase.storage
        .from("logo_ormawa")
        .upload(fileName, arrayBuffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("logo_ormawa").getPublicUrl(fileName);
      return data?.publicUrl || "";
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const errors = [];
    if (!nama_ormawa.trim()) errors.push("• Nama ormawa wajib diisi");
    if (!nama_ketum.trim()) errors.push("• Nama ketum wajib diisi");
    if (!deskripsi_ormawa.trim()) errors.push("• Deskripsi wajib diisi");
    if (!since.trim()) errors.push("• Since wajib dipilih");
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (errors.length > 0) {
      Alert.alert("Gagal", errors.join("\n"));
      return;
    }

    setSaving(true);
    try {
      let logo_ormawa = "";
      if (imageUri) logo_ormawa = await uploadLogoToStorage(imageUri);

      const payload = {
        nama_ormawa: nama_ormawa.trim(),
        kepanjangan: kepanjangan.trim(),
        nama_ketum: nama_ketum.trim(),
        jumlah_anggota: jumlah_anggota ? Number(jumlah_anggota) : null,
        total_depart: total_depart ? Number(total_depart) : null,
        deskripsi_ormawa: deskripsi_ormawa.trim(),
        since: since.trim() ? since.trim() : null,
        logo_ormawa,
      };

      const { error } = await supabase.from("tb_ormawa").insert([payload]);
      if (error) {
        Alert.alert("Gagal", error.message);
        return;
      }

      Alert.alert("Berhasil", "Data ormawa berhasil ditambahkan.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message || "Terjadi kesalahan sistem");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <HeaderPrimary title="TAMBAH ORMAWA" />

      <ScrollView
        style={GlobalStyles.formContainer}
        contentContainerStyle={GlobalStyles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={GlobalStyles.formWrap}>
          <Text style={GlobalStyles.formLabel}>Logo Ormawa</Text>
          <View style={GlobalStyles.avatarBox}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={GlobalStyles.avatarPreview} />
            ) : (
              <View style={GlobalStyles.avatarPlaceholder}>
                <Text style={GlobalStyles.avatarPlaceholderText}>Belum ada gambar</Text>
              </View>
            )}

            <TouchableOpacity
              style={GlobalStyles.secondaryBtn}
              activeOpacity={0.85}
              onPress={pickImage}
              disabled={saving || uploading}
            >
              <Text style={GlobalStyles.secondaryBtnText}>Pilih Gambar</Text>
            </TouchableOpacity>

            {uploading ? (
              <View style={GlobalStyles.uploadRow}>
                <ActivityIndicator size="small" />
                <Text style={GlobalStyles.uploadText}>Uploading...</Text>
              </View>
            ) : null}
          </View>

          <Text style={GlobalStyles.formLabel}>Nama Ormawa</Text>
          <TextInput
            style={GlobalStyles.formInput}
            placeholder="Masukkan nama ormawa"
            value={nama_ormawa}
            onChangeText={setNamaOrmawa}
          />

          <Text style={GlobalStyles.formLabel}>Kepanjangan</Text>
          <TextInput
            style={GlobalStyles.formInput}
            placeholder="Masukkan kepanjangan"
            value={kepanjangan}
            onChangeText={setKepanjangan}
          />

          <Text style={GlobalStyles.formLabel}>Nama Ketum</Text>
          <TextInput
            style={GlobalStyles.formInput}
            placeholder="Masukkan nama ketua umum"
            value={nama_ketum}
            onChangeText={setNamaKetum}
          />

          <Text style={GlobalStyles.formLabel}>Jumlah Anggota</Text>
          <TextInput
            style={GlobalStyles.formInput}
            placeholder="Contoh: 120"
            value={jumlah_anggota}
            onChangeText={setJumlahAnggota}
            keyboardType="numeric"
          />

          <Text style={GlobalStyles.formLabel}>Total Depart</Text>
          <TextInput
            style={GlobalStyles.formInput}
            placeholder="Contoh: 6"
            value={total_depart}
            onChangeText={setTotalDepart}
            keyboardType="numeric"
          />

          <Text style={GlobalStyles.formLabel}>Deskripsi</Text>
          <TextInput
            style={[GlobalStyles.formInput, { height: 110, textAlignVertical: "top" }]}
            placeholder="Masukkan deskripsi"
            value={deskripsi_ormawa}
            onChangeText={setDeskripsi}
            multiline
          />

          {/* ✅ Since pakai kalender */}
          <Text style={GlobalStyles.formLabel}>Since</Text>
          <TouchableOpacity
            style={[
              GlobalStyles.formInput,
              { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
            ]}
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: since ? "#000" : "#999" }}>
              {since
                ? new Date(since).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
                : "Pilih Tanggal"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#666" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={since ? new Date(since) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TouchableOpacity
            style={GlobalStyles.primaryBtn}
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={saving || uploading}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={GlobalStyles.primaryBtnText}>Simpan</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.cancelBtn}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
            disabled={saving || uploading}
          >
            <Text style={GlobalStyles.cancelBtnText}>Batal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavBotAdmin navigation={navigation} />
    </View>
  );
};

export default CreateOrmawa;
