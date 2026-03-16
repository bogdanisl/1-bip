import FileItem from "@/src/components/buttons/ItemButton";
import ContactForm from "@/src/features/tabs/contact/components/contactForm";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme.web";
import { useSelectedBipStore } from "@/src/hooks/use-selected-bip";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
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
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useOfficeData } from "./hooks/useOfficeData";
import { Br } from "@/src/components/Br";

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

    const officeData = useOfficeData();
    const styles = useMemo(
        () => createContactStyles(themeColors),
        [themeColors]
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>

                {selectedBip != null && officeData ? (
                    <>
                        <View style={[styles.section, { marginBottom: 20 }]}>

                            <Text style={styles.sectionText}>
                                {t('contact_us')}
                            </Text>
                            <Text style={styles.sectionDesc}>{t('contact_us_desc')}</Text>

                            <Text
                                style={{
                                    marginTop: 25,
                                    marginBottom: 12,
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: themeColors.text,
                                    paddingRight: 120
                                }}
                            >
                                {selectedBip.name}
                            </Text>
                            <Br />
                            <View style={{ paddingHorizontal: 17, paddingLeft: 0 }}>
                                {
                                    officeData.phone?.value &&
                                    <FileItem
                                        name={officeData.phone.value}
                                        details={t('phone_number')}
                                        iconBackground={themeColors.background}
                                        style={{ backgroundColor: themeColors.background_2 }}
                                        leftIconName={"phone"}
                                        rightIconName="call-made"
                                        onPress={() => {
                                            Linking.openURL(`tel:${officeData.phone?.value}`)
                                        }}
                                    ></FileItem>

                                }
                                {officeData.email?.value &&
                                    <FileItem
                                        name={officeData.email?.value}
                                        details="E-mail"
                                        iconBackground={themeColors.background}
                                        style={{ backgroundColor: themeColors.background_2, marginTop: 10 }}
                                        leftIconName={"mail"}
                                        rightIconName="message"
                                        onPress={() => { Linking.openURL(`mailto:${officeData.email?.value}`); }}
                                    ></FileItem>

                                }
                                <FileItem
                                    name={`${officeData.street?.value},\n${officeData.postalCode?.value}, ${officeData.city?.value}`}
                                    details={t('address')}
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
                                        openNavigation(officeData?.map?.lat ?? 50.4933467, officeData?.map?.lng ?? 19.4179835, 'ALPANET');
                                    }}
                                ></FileItem>
                                {Platform.OS == 'ios' &&
                                    <View style={{
                                        backgroundColor: themeColors.background_2,

                                        height: 250,
                                        marginTop: 0,
                                        padding: 15,
                                        paddingTop: 5,
                                        borderRadius: 15,

                                        elevation: 3,
                                        borderTopLeftRadius: 0, borderTopRightRadius: 0
                                    }}>
                                        <View
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 15,
                                                backgroundColor: 'red',
                                                overflow: 'hidden'
                                            }}>
                                            <MapView
                                                key={`${officeData?.map}`}
                                                userInterfaceStyle={colorSheme == 'dark' ? 'dark' : 'light'}
                                                style={[styles.map]}
                                                scrollEnabled={false}
                                                rotateEnabled={false}
                                                region={{
                                                    latitude: officeData?.map?.lat || 50.4933467,
                                                    longitude: officeData?.map?.lng || 19.4179735,
                                                    latitudeDelta: 0.005,
                                                    longitudeDelta: 0.005,
                                                }}


                                            >
                                                <Marker
                                                    coordinate={{
                                                        latitude: officeData?.map?.lat ?? 50.4933467,
                                                        longitude: officeData?.map?.lng ?? 19.4179835,
                                                    }}
                                                    title={officeData.title.value}

                                                />
                                            </MapView>

                                        </View>
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
                            {t('contact_form')}
                        </Text>
                    </View>
                </View>

                <ContactForm />


            </ScrollView>
        </View>
    );
};

export default ContactScreen;


