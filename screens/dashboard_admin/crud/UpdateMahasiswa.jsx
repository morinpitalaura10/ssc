import React, { useCallback, useEffect, useState } from "react";
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

const UpdateMahasiswa = ({ navigation, route }) => {
    const { id_user } = route.params || {};

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

    // form state
    const [nama_lengkap, setNamaLengkap] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // optional saat update
    const [nope, setNope] = useState("");
    const [role, setRole] = useState(ROLE_OPTIONS[0]);
    const [jurusan, setJurusan] = useState(JURUSAN_OPTIONS[0]);

    // image
    const [imageUri, setImageUri] = useState("");       // local picked image
    const [oldImageUrl, setOldImageUrl] = useState(""); // url existing from DB

    // loading states
    const [loading, setLoading] = useState(true);   // fetch detail
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!id_user) {
            Alert.alert("Gagal", "id_user tidak ditemukan.");
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from("tb_user")
            .select("id_user, nama_lengkap, username, nope, role, jurusan, img_pp")
            .eq("id_user", id_user)
            .single();

        if (error) {
            Alert.alert("Gagal", error.message);
            setLoading(false);
            return;
        }

        setNamaLengkap(data?.nama_lengkap || "");
        setUsername(data?.username || "");
        setNope(data?.nope || "");
        setRole(data?.role || ROLE_OPTIONS[0]);
        setJurusan(data?.jurusan || JURUSAN_OPTIONS[0]);
        setOldImageUrl(data?.img_pp || "");

        setLoading(false);
    }, [id_user]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

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
            // sesuai bucket kamu: img_pp
            const fileName = `public/img_pp${Date.now()}.jpg`;

            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
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

    // validasi update: password boleh kosong (kalau kamu mau wajib, tinggal aktifin)
    const validate = () => {
        const errors = [];
        if (!nama_lengkap.trim()) errors.push("• Nama lengkap wajib diisi");
        if (!username.trim()) errors.push("• Username wajib diisi");
        if (!nope.trim()) errors.push("• No HP wajib diisi");
        if (!role) errors.push("• Role wajib dipilih");
        if (!jurusan) errors.push("• Jurusan wajib dipilih");
        return errors;
    };

    const handleUpdate = async () => {
        const errors = validate();
        if (errors.length > 0) {
            Alert.alert("Gagal", errors.join("\n"));
            return;
        }

        setSaving(true);
        try {
            // kalau user pilih foto baru → upload, kalau tidak → pakai oldImageUrl
            let img_pp = oldImageUrl || "";
            if (imageUri) {
                img_pp = await uploadAvatarToStorage(imageUri);
            }

            const payload = {
                nama_lengkap: nama_lengkap.trim(),
                username: username.trim(),
                nope: nope.trim(),
                role,
                jurusan,
                img_pp,
            };

            // password hanya diupdate kalau diisi
            if (password.trim()) payload.password = password.trim();

            const { error } = await supabase
                .from("tb_user")
                .update(payload)
                .eq("id_user", id_user);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            Alert.alert("Berhasil", "Data mahasiswa berhasil diperbarui.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (err) {
            Alert.alert("Error", err.message || "Terjadi kesalahan sistem");
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="EDIT MAHASISWA" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : (
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
                            ) : oldImageUrl ? (
                                <Image source={{ uri: oldImageUrl }} style={GlobalStyles.avatarPreview} />
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

                        <Text style={GlobalStyles.formLabel}>Password (opsional)</Text>
                        <TextInput
                            style={GlobalStyles.formInput}
                            placeholder="Isi jika ingin ganti password"
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
                            onPress={handleUpdate}
                            disabled={saving || uploading}
                        >
                            {saving ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text style={GlobalStyles.primaryBtnText}>Simpan Perubahan</Text>
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
            )}

            <NavBotAdmin navigation={navigation} />
        </View>
    );
};

export default UpdateMahasiswa;
