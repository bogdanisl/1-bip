import FileItem from "@/src/components/buttons/ItemButton";
import ContactForm from "@/src/features/tabs/contact/components/contactForm";
import { officeDataExample } from "@/src/constants/data_example";
import { Colors, hexToRgba } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme.web";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { MapParams, OfficeData } from "@/src/types/OfficeData";
import { fetchOfficeData } from "@/src/services/api/data";
import { storage } from "@/src/storage/asyncStorage";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Linking,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { createContactStyles } from "./ContactScreenStyles";
import { useOfficeMap } from "./hooks/useOfficeMap";

export const openNavigation = (lat: any, lng: any, label = 'Punkt') => {
    const url = Platform.select({
        ios: `http://maps.apple.com/?daddr=${lat},${lng}&q=${label}`,
        android: `google.navigation:q=${lat},${lng}`,
    });

    if (url)
        Linking.openURL(url);
};

const ContactScreen = () => {
    const { t } = useTranslation();
    const themeColors = useColorScheme() == "dark" ? Colors.dark : Colors.light;
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const colorSheme = useColorScheme()
    const mapParams = useOfficeMap(selectedBip);
    const styles = useMemo(
        () => createContactStyles(themeColors),
        [themeColors]
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>

                {selectedBip != null ? (
                    <>
                        <View style={[styles.section, { marginBottom: 20 }]}>

                            <Text style={styles.sectionText}>
                                {'Skontaktuj się z nami'}
                            </Text>
                            <Text style={styles.sectionDesc}>{"Wybierz najwygodniejsą dla siebie formę kontaktu"}</Text>
                            <View style={{ padding: 17, paddingLeft: 0 }}>
                                <FileItem
                                    name={"111 222 334"}
                                    details="Telefon"
                                    iconBackground={themeColors.background}
                                    style={{ backgroundColor: themeColors.background_2, marginTop: 20 }}
                                    leftIconName={"phone"}
                                    rightIconName="call-made"
                                    onPress={() => {
                                        console.log(mapParams)
                                    }}
                                ></FileItem>

                                <FileItem
                                    name={"biuro@testowo.pl"}
                                    details="E-mail"
                                    iconBackground={themeColors.background}
                                    style={{ backgroundColor: themeColors.background_2, marginTop: 10 }}
                                    leftIconName={"mail"}
                                    rightIconName="message"
                                    onPress={() => { Linking.openURL(`mailto:biuro@testowo.pl`); }}
                                ></FileItem>
                                <FileItem
                                    name={"Testowa 11A,\n42-400 Testowo"}
                                    details="Adres"
                                    iconBackground={themeColors.background}
                                    style={{
                                        backgroundColor: themeColors.background_2,
                                        marginTop: 10,
                                        borderBottomRightRadius: Platform.OS == 'android' ? 15 : 0,
                                        borderBottomLeftRadius: Platform.OS == 'android' ? 15 : 0
                                    }}
                                    leftIconName={"location-on"}
                                    rightIconName={"open-in-new"}
                                    onPress={() => {
                                        openNavigation(mapParams?.lat ?? 50.4933467, mapParams?.lng ?? 19.4179835, 'ALPANET');
                                    }}
                                ></FileItem>
                                {
                                    <View style={{ backgroundColor: themeColors.background_2, height: 250, marginTop: 0, padding: 15, paddingTop: 5, borderRadius: 12, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                                        <MapView
                                            key={`${mapParams}`}
                                            userInterfaceStyle={colorSheme == 'dark' ? 'dark' : 'light'}
                                            style={[styles.map, { borderRadius: 12 }]}
                                            scrollEnabled={false}
                                            rotateEnabled={false}
                                            initialRegion={{
                                                latitude: mapParams?.lat || 50.4933467,
                                                longitude: mapParams?.lng || 19.4179735,
                                                latitudeDelta: 0.005,
                                                longitudeDelta: 0.005,
                                            }}
                                            
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: mapParams?.lat ?? 50.4933467,
                                                    longitude: mapParams?.lng ?? 19.4179835,
                                                }}
                                                title="ALPANET"
                                                description="Polskie Systemy Internetowe"
                                            />
                                        </MapView>

                                    </View>
                                }
                            </View>

                        </View>
                    </>
                ) : (
                    <>
                        <View style={[styles.section, { marginBottom: 20 }]}>
                            <Text style={styles.sectionText}>
                                {t("want_to_talk_preview_title")}
                            </Text>
                            <Text style={styles.sectionDesc}>{t("want_to_talk_preview_desc")}</Text>
                        </View>
                        <View style={styles.profileWrapper}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('@/assets/images/avatar.webp')}
                                    style={styles.avatar}
                                    resizeMode="cover"
                                />
                            </View>

                            <View style={styles.row}>

                                <View style={styles.leftColumn}>
                                    <Text style={styles.nameText}>Julia Muniowska</Text>
                                    <Text style={styles.roleText}>
                                        {t("specialist")}
                                        {"\n"}
                                        {t("client_service")}
                                    </Text>
                                </View>


                                <View style={styles.rightColumn}>
                                    <View style={styles.iconRow}>
                                        <FontAwesome5
                                            name="phone"
                                            size={16}
                                            color={themeColors.tint}
                                        />
                                        <Text
                                            style={styles.iconText}
                                            onPress={() => Linking.openURL("tel:799068203")}
                                        >
                                            32 67 000 97
                                        </Text>
                                    </View>

                                    <View style={styles.iconRow}>
                                        <MaterialIcons
                                            name="email"
                                            size={18}
                                            color={themeColors.tint}
                                        />
                                        <Text
                                            style={styles.iconText}
                                            onPress={() =>
                                                Linking.openURL("mailto:j.muniowska@alpanet.pl")
                                            }
                                        >
                                            j.muniowska{"\n"}@alpanet.pl
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                )}


                {/* Consultation */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 24 }}>
                    <View style={{ height: 30, alignItems: 'flex-start' }}>
                        <Text
                            style={[styles.sectionText, { color: themeColors.text }]}>
                            {t('Formularz kontaktowy')}
                        </Text>
                    </View>
                </View>

                <ContactForm />


            </ScrollView>
        </View>
    );
};

export default ContactScreen;


