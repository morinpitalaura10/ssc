import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HeaderPrimary from "../../../components/atom/HeaderPrimary";
import NavBotAdmin from "../../../components/organisms/NavBotAdmin";
import CardBg from "../../../components/molecules/CardBg";
import { Colors, GlobalStyles } from "../../../styles/GlobalStyles";
import { supabase } from "../../../utils/supabase";

const ReadUKM = ({ navigation, route }) => {
    const { id_ukm } = route.params || {};

    const [row, setRow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchDetail = useCallback(async () => {
        setLoading(true);
        setErrorMsg("");

        if (!id_ukm) {
            setErrorMsg("ID UKM tidak ditemukan.");
            setRow(null);
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("tb_ukm")
            .select("id_ukm, nama_ukm, kepanjangan, jumlah_anggota, deskripsi_ukm, logo_ukm, since, tempat_latihan")
            .eq("id_ukm", id_ukm)
            .single();

        if (error) {
            setErrorMsg(error.message);
            setRow(null);
        } else {
            setRow(data);
        }

        setLoading(false);
    }, [id_ukm]);

    useEffect(() => {
        fetchDetail();
    }, [fetchDetail]);

    const Logo = () => {
        if (row?.logo_ukm && typeof row.logo_ukm === "string" && row.logo_ukm.startsWith("http")) {
            return <Image source={{ uri: row.logo_ukm }} style={GlobalStyles.readAvatar} />;
        }
        return (
            <View style={GlobalStyles.readAvatarFallback}>
                <Ionicons name="school-outline" size={38} color={Colors.primary} />
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
            <HeaderPrimary title="DETAIL UKM" />

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
                <ScrollView contentContainerStyle={GlobalStyles.readScrollContent} showsVerticalScrollIndicator={false}>
                    <CardBg>
                        <View style={GlobalStyles.readAvatarWrap}>
                            <Logo />
                        </View>

                        <ReadField label="ID UKM" value={String(row?.id_ukm ?? "")} />
                        <ReadField label="Nama UKM" value={row?.nama_ukm} />
                        <ReadField label="Kepanjangan" value={row?.kepanjangan} />
                        <ReadField label="Jumlah Anggota" value={row?.jumlah_anggota?.toString()} />
                        <ReadField label="Tempat Latihan" value={row?.tempat_latihan} />
                        <ReadField label="Since" value={row?.since?.toString()} />
                        <ReadField label="Deskripsi" value={row?.deskripsi_ukm} />

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

export default ReadUKM;
