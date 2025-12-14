import React, { useCallback, useEffect, useState, useContext } from "react";
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

import HeaderPrimary from "../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../components/organisms/NavBotAdmin";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { supabase } from "../../utils/supabase";
import { AuthContext } from "../../context/AuthContext";

const decodeBase64ToArrayBuffer = (base64) => {
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

const EditProfileAdmin = ({ navigation }) => {
    const { user, setUser } = useContext(AuthContext);

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

    const [id_user, setIdUser] = useState(null);

    const [nama_lengkap, setNamaLengkap] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); // opsional update
    const [nope, setNope] = useState("");
    const [role, setRole] = useState("");
    const [jurusan, setJurusan] = useState(JURUSAN_OPTIONS[0]);

    const [imageUri, setImageUri] = useState("");
    const [oldImageUrl, setOldImageUrl] = useState("");

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const isHttp = (v) => typeof v === "string" && v.startsWith("http");

    const fetchDetail = useCallback(async () => {
        setLoading(true);
        setErrorMsg("");

        const uname = user?.username?.trim();
        if (!uname) {
            setErrorMsg("Username login tidak ditemukan.");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("tb_user")
            .select("id_user, nama_lengkap, username, role, nope, jurusan, img_pp")
            .eq("username", uname)
            .single();

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        setIdUser(data?.id_user ?? null);
        setNamaLengkap(data?.nama_lengkap || "");
        setUsername(data?.username || "");
        setNope(data?.nope || "");
        setRole(data?.role || "");
        setJurusan(data?.jurusan || JURUSAN_OPTIONS[0]);
        setOldImageUrl(data?.img_pp || "");

        setLoading(false);
    }, [user?.username]);

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
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) setImageUri(result.assets[0].uri);
    };

    const uploadPPToStorage = async (uri) => {
        if (!uri) return "";
        setUploading(true);
        try {
            // bucket: img_pp (sesuai kamu)
            const fileName = `public/img_pp${Date.now()}.jpg`;

            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
            const arrayBuffer = decodeBase64ToArrayBuffer(base64);

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

    const validate = () => {
        const errors = [];
        if (!nama_lengkap.trim()) errors.push("• Nama lengkap wajib diisi");
        if (!username.trim()) errors.push("• Username wajib diisi");
        if (!nope.trim()) errors.push("• No HP wajib diisi");
        if (!jurusan) errors.push("• Jurusan wajib dipilih");
        return errors;
    };

    const handleSave = async () => {
        const errors = validate();
        if (errors.length > 0) {
            Alert.alert("Gagal", errors.join("\n"));
            return;
        }

        if (!id_user) {
            Alert.alert("Gagal", "id_user tidak ditemukan.");
            return;
        }

        setSaving(true);
        try {
            let img_pp = oldImageUrl || "";
            if (imageUri) img_pp = await uploadPPToStorage(imageUri);

            const payload = {
                nama_lengkap: nama_lengkap.trim(),
                username: username.trim(),
                nope: nope.trim(),
                jurusan,
                img_pp,
            };

            // password hanya kalau diisi
            if (password.trim()) payload.password = password.trim();

            // role tidak diubah (biar aman)
            const { error } = await supabase
                .from("tb_user")
                .update(payload)
                .eq("id_user", id_user);

            if (error) {
                Alert.alert("Gagal", error.message);
                return;
            }

            // update context biar nama/username langsung kebaca di dashboard
            if (setUser) {
                setUser((prev) => ({
                    ...(prev || {}),
                    name: payload.nama_lengkap,
                    username: payload.username,
                }));
            }

            Alert.alert("Berhasil", "Profil berhasil diperbarui.", [
                { text: "OK", onPress: () => navigation.goBack() },
            ]);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", err?.message || "Terjadi kesalahan sistem");
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="EDIT PROFIL" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : errorMsg ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={GlobalStyles.scrollContainer}
                >
                    <Text style={GlobalStyles.errorText}>{errorMsg}</Text>

                    <TouchableOpacity
                        style={GlobalStyles.primaryBtn}
                        activeOpacity={0.85}
                        onPress={fetchDetail}
                    >
                        <Text style={GlobalStyles.primaryBtnText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <ScrollView
                    style={GlobalStyles.formContainer}
                    contentContainerStyle={GlobalStyles.formContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={GlobalStyles.formWrap}>
                        <Text style={GlobalStyles.formLabel}>Foto Profil</Text>
                        <View style={GlobalStyles.avatarBox}>
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={GlobalStyles.avatarPreview} />
                            ) : isHttp(oldImageUrl) ? (
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

                        <Text style={GlobalStyles.formLabel}>Role</Text>
                        <TextInput style={GlobalStyles.formInput} value={role || "-"} editable={false} />

                        <Text style={GlobalStyles.formLabel}>Jurusan</Text>
                        <View style={GlobalStyles.pickerWrap}>
                            <Picker selectedValue={jurusan} onValueChange={setJurusan} style={GlobalStyles.picker}>
                                {JURUSAN_OPTIONS.map((opt) => (
                                    <Picker.Item key={opt} label={opt} value={opt} />
                                ))}
                            </Picker>
                        </View>

                        <TouchableOpacity
                            style={GlobalStyles.primaryBtn}
                            activeOpacity={0.85}
                            onPress={handleSave}
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

export default EditProfileAdmin;
