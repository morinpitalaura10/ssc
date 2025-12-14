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
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system/legacy";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import { GlobalStyles } from "../../../styles/GlobalStyles";
import { supabase } from "../../../utils/supabase";


const CreateMahasiswa = ({ navigation }) => {
    const ROLE_OPTIONS = ["mahasiswa", "admin"];

    const JURUSAN_OPTIONS = [
        "Informatika",
        "MPI",
        "Matematika",
        "PAI",
        "PBA",
        "PGMI",
        "PIAUD",
        "PJJ PAI",
        "PJJ PBA",
        "PJJ PGMI",
        "TBINDO",
        "TBI",
        "TBIO",
        "TKIM",
        "TMTK",
    ];

    const [nama_lengkap, setNamaLengkap] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nope, setNope] = useState("");


    const [role, setRole] = useState(ROLE_OPTIONS[0]);
    const [jurusan, setJurusan] = useState(JURUSAN_OPTIONS[0]);

    const [imageUri, setImageUri] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Izin ditolak", "Aplikasi butuh akses galeri untuk pilih foto.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
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

    const uploadAvatarToStorage = async (uri) => {
        setUploading(true);
        try {
            // Force extension to jpg because RLS policy requires it: (storage.extension(name) = 'jpg'::text)
            const fileName = `public/img_pp${Date.now()}.jpg`;

            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: "base64",
            });
            const arrayBuffer = decode(base64);

            const { error: uploadError } = await supabase.storage
                .from("img_pp")
                .upload(fileName, arrayBuffer, {
                    contentType: "image/jpeg",
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("img_pp").getPublicUrl(fileName);
            return data?.publicUrl || "";
        } finally {
            setUploading(false);
        }
    };

    // ✅ VALIDASI: tampilkan semua yang kosong
    const validate = () => {
        const errors = [];
        if (!nama_lengkap.trim()) errors.push("• Nama lengkap wajib diisi");
        if (!username.trim()) errors.push("• Username wajib diisi");
        if (!password.trim()) errors.push("• Password wajib diisi");
        if (!nope.trim()) errors.push("• No HP wajib diisi");
        if (!role) errors.push("• Role wajib dipilih");
        if (!jurusan) errors.push("• Jurusan wajib dipilih");
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
            let img_pp = "";
            if (imageUri) {
                img_pp = await uploadAvatarToStorage(imageUri);
            }

            const payload = {
                nama_lengkap: nama_lengkap.trim(),
                username: username.trim(),
                password: password.trim(), // ✅ wajib
                nope: nope.trim(),
                role,
                jurusan,
                img_pp,
            };

            const { error } = await supabase.from("tb_user").insert([payload]);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            // ✅ alert dulu, baru balik ke CrudMahasiswa
            Alert.alert("Berhasil", "Data mahasiswa berhasil ditambahkan.", [
                {
                    text: "OK",
                    onPress: () => navigation.goBack(),
                },
            ]);

        } catch (err) {
            Alert.alert("Error", "Terjadi kesalahan sistem");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="TAMBAH MAHASISWA" />

            <ScrollView
                style={GlobalStyles.formContainer}
                contentContainerStyle={GlobalStyles.formContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={GlobalStyles.formWrap}>
                    {/* FOTO */}
                    <Text style={GlobalStyles.formLabel}>Foto Profil</Text>
                    <View style={GlobalStyles.avatarBox}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={GlobalStyles.avatarPreview} />
                        ) : (
                            <View style={GlobalStyles.avatarPlaceholder}>
                                <Text style={GlobalStyles.avatarPlaceholderText}>Belum ada foto</Text>
                            </View>
                        )}

                        <TouchableOpacity
                            style={GlobalStyles.secondaryBtn}
                            activeOpacity={0.85}
                            onPress={pickImage}
                            disabled={saving || uploading}
                        >
                            <Text style={GlobalStyles.secondaryBtnText}>Pilih Foto</Text>
                        </TouchableOpacity>

                        {uploading ? (
                            <View style={GlobalStyles.uploadRow}>
                                <ActivityIndicator size="small" />
                                <Text style={GlobalStyles.uploadText}>Uploading...</Text>
                            </View>
                        ) : null}
                    </View>

                    {/* INPUT */}
                    <Text style={GlobalStyles.formLabel}>Nama Lengkap</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan nama lengkap"
                        value={nama_lengkap}
                        onChangeText={setNamaLengkap}
                    />

                    <Text style={GlobalStyles.formLabel}>Username</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan username"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <Text style={GlobalStyles.formLabel}>Password</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <Text style={GlobalStyles.formLabel}>No. HP</Text>
                    <TextInput
                        style={GlobalStyles.formInput}
                        placeholder="Masukkan nomor HP"
                        value={nope}
                        onChangeText={setNope}
                        keyboardType="phone-pad"
                    />

                    {/* ROLE */}
                    <Text style={GlobalStyles.formLabel}>Role</Text>
                    <View style={GlobalStyles.pickerWrap}>
                        <Picker selectedValue={role} onValueChange={setRole} style={GlobalStyles.picker}>
                            {ROLE_OPTIONS.map((opt) => (
                                <Picker.Item key={opt} label={opt} value={opt} />
                            ))}
                        </Picker>
                    </View>

                    {/* JURUSAN */}
                    <Text style={GlobalStyles.formLabel}>Jurusan</Text>
                    <View style={GlobalStyles.pickerWrap}>
                        <Picker selectedValue={jurusan} onValueChange={setJurusan} style={GlobalStyles.picker}>
                            {JURUSAN_OPTIONS.map((opt) => (
                                <Picker.Item key={opt} label={opt} value={opt} />
                            ))}
                        </Picker>
                    </View>

                    {/* SUBMIT */}
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

export default CreateMahasiswa;
