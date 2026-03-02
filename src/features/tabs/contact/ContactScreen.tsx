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

                {officeData && (

                    <View style={[styles.section, { marginBottom: 20 }]}>
                        <Text style={styles.sectionText}>
                            {t('contact_us')}
                        </Text>
                        <Text style={styles.sectionDesc}>{t('contact_us_desc')}</Text>

                        <Text
                            style={[styles.sectionText, { color: themeColors.text, paddingTop: 20, paddingBottom: 5 }]}>
                            {officeData.name?.value}
                        </Text>
                        <View style={{
                            paddingRight:17
                        }}>
                            <Br />
                        </View>
                        <View style={{ paddingRight: 17, paddingLeft: 0 }}>
                            {
                                officeData.phone?.value &&
                                <FileItem
                                    name={officeData.phone.value}
                                    details="Telefon"
                                    iconBackground={themeColors.background}
                                    style={{ backgroundColor: themeColors.background_2, marginTop: 20 }}
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
                                details="Adres"
                                iconBackground={themeColors.background}
                                style={{
                                    backgroundColor: themeColors.background_2,
                                    marginTop: 10,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 0
                                }}
                                leftIconName={"location-on"}
                                rightIconName={"open-in-new"}
                                onPress={() => {
                                    openNavigation(officeData?.map?.lat ?? 50.4933467, officeData?.map?.lng ?? 19.4179835, 'ALPANET');
                                }}
                            ></FileItem>
                            {
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

                )}

                {/* Consultation */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 24 }}>
                    <View style={{ alignItems: 'flex-start' }}>
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


