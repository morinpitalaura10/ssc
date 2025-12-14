import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import CardBg from "../../../components/molecules/CardBg";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import { supabase } from "../../../utils/supabase";

const ReadMahasiswa = ({ navigation, route }) => {
    const { id_user } = route.params || {};

    const [row, setRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchDetail = useCallback(async () => {
        setLoading(true);
        setErrorMsg("");

        if (!id_user) {
            setErrorMsg("ID mahasiswa tidak ditemukan.");
            setRow(null);
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("tb_user")
            .select("id_user, nama_lengkap, username, jurusan, nope, role, img_pp")
            .eq("id_user", id_user)
            .single();

        if (error) {
            setErrorMsg(error.message);
            setRow(null);
        } else {
            setRow(data);
        }

        setLoading(false);
    }, [id_user]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const Avatar = () => {
        if (row?.img_pp && typeof row.img_pp === "string" && row.img_pp.startsWith("http")) {
            return <Image source={{ uri: row.img_pp }} style={GlobalStyles.readAvatar} />;
        }
        return (
            <View style={GlobalStyles.readAvatarFallback}>
                <Ionicons name="person" size={38} color={Colors.primary} />
            </View>
        );
    };

    const ReadField = ({ label, value }) => (
        <View style={GlobalStyles.readFieldWrap}>
            <Text style={GlobalStyles.readFieldLabel}>{label}</Text>
            <View style={GlobalStyles.readFieldBox}>
                <Text style={GlobalStyles.readFieldValue}>{value || "-"}</Text>
            </View>
        </View>
    );

    return (
        <View style={GlobalStyles.container}>
            <HeaderPrimary title="DETAIL MAHASISWA" />

            {loading ? (
                <View style={GlobalStyles.centerContent}>
                    <ActivityIndicator size="small" />
                </View>
            ) : errorMsg ? (
                <View style={GlobalStyles.emptyWrap}>
                    <Ionicons name="alert-circle-outline" size={42} color={Colors.primary} />
                    <Text style={GlobalStyles.emptyText}>Gagal memuat data</Text>
                    <Text style={GlobalStyles.emptySubText}>{errorMsg}</Text>

                    <TouchableOpacity style={GlobalStyles.primaryBtn} onPress={fetchDetail} activeOpacity={0.85}>
                        <Text style={GlobalStyles.primaryBtnText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={GlobalStyles.readScrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <CardBg>
                        <View style={GlobalStyles.readAvatarWrap}>
                            <Avatar />
                        </View>

                        <ReadField label="ID User" value={String(row?.id_user ?? "")} />
                        <ReadField label="Nama Lengkap" value={row?.nama_lengkap} />
                        <ReadField label="Username" value={row?.username} />
                        <ReadField label="Role" value={row?.role} />
                        <ReadField label="Jurusan" value={row?.jurusan} />
                        <ReadField label="No. HP" value={row?.nope} />


                        <View style={GlobalStyles.readActionsRow}>

                            <TouchableOpacity
                                style={GlobalStyles.readBackBtn}
                                activeOpacity={0.85}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={GlobalStyles.readBackBtnText}>Kembali</Text>
                            </TouchableOpacity>
                        </View>
                    </CardBg>
                </ScrollView>
            )}

            <NavBotAdmin navigation={navigation} />
        </View>
    );
};

export default ReadMahasiswa;
