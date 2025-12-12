import FileItem from "@/components/buttons/ItemButton";
import ContactForm from "@/components/contactForm";
import { Colors, hexToRgba } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useSelectedBipStore } from "@/hooks/use-selected-bip";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from 'react-native-maps';


export const openNavigation = (lat: any, lng: any, label = 'Punkt') => {
  const url = Platform.select({
    ios: `http://maps.apple.com/?daddr=${lat},${lng}&q=${label}`,
    android: `google.navigation:q=${lat},${lng}`,
  });

  if (url)
    Linking.openURL(url);
};
const screen = Dimensions.get("screen").width;

const ContactHeader = () => {
  const { t } = useTranslation();
  const themeColors = useColorScheme() == "dark" ? Colors.dark : Colors.light;
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const colorSheme = useColorScheme()
  const styles = StyleSheet.create({
    headerRow: { flexDirection: "row", marginLeft: 24, height: 30, paddingTop: 50 },
    section: { paddingLeft: 17 },
    sectionText: {
      color: themeColors.tint,
      fontFamily: "Poppins-Bold",
      fontSize: 20,
      paddingRight: 80,
    },
    sectionDesc: {
      color: themeColors.text,
      fontFamily: "Poppins-Medium",
      fontSize: 14,
      paddingRight: 80,
      paddingTop: 20,
    },
    profileWrapper: {
      padding: 24,
      marginTop: 40,
      alignItems: "center",
    },
    avatarContainer: {
      padding: 5,
      borderRadius: 70,
      backgroundColor: themeColors.background,
      borderColor: hexToRgba(themeColors.text, 0.15),
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: { width: 114, height: 114, borderRadius: 70 },
    row: { flexDirection: "row", padding: 24, justifyContent: "space-between" },
    leftColumn: { flex: 1, alignItems: "flex-end", marginRight: 20 },
    nameText: {
      color: themeColors.text,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginBottom: 11,
    },
    roleText: {
      color: themeColors.text,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginBottom: 20,
      textAlign: "right",
    },
    rightColumn: { flex: 1 },
    iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    iconText: {
      marginLeft: 8,
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 14,
    },
    consultContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    consultTitle: {
      fontSize: 20,
      height: 45,
      fontFamily: "Poppins-SemiBold",
      textAlign: "left",
    },
    consultDesc: {
      padding: 12,
      paddingRight: 44,
      color: themeColors.text,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
    },
    promoTextContainer: {
      padding: 20,
      paddingRight: 48,
      paddingBottom: 48,
    },
    promoText: {
      color: themeColors.text,
      fontFamily: "Poppins-Bold",
      fontSize: 24,
    },
    addressHeader: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 16,
    },
    addressHeaderText: {
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 15,
    },
    imageRow: { flexDirection: "row", padding: 16 },
    image: {
      width: screen / 2 - 20,
      height: screen / 2 - 20,
      borderRadius: 8,
      marginRight: 16,
    },
    companyTextContainer: { flex: 1 },
    companyName: {
      fontSize: 20,
      height: 25,
      fontFamily: "Poppins-Bold",
    },
    companySub: {
      marginBottom: 4,

      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 12,
    },
    companyAddress: {
      marginBottom: 4,
      marginTop: 12,
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 12,
    },
    companyContact: {
      color: themeColors.text,
      fontFamily: "Poppins-SemiBold",
      fontSize: 12,
    },
    contactRow: {
      flexDirection: "row",
      padding: 16,
      paddingBottom: 48,
    },
    contactColumn: { flex: 1 },
    openHoursColumn: {
      flex: 1,
      paddingBottom: Platform.OS === "ios" ? 100 : 200,
    },
    openText: {
      marginTop: -20,
      marginBottom: 20,
      width: "55%",
      textAlign: "center",
      paddingVertical: 4,
      borderRadius: 4,
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
    },
    hoursRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 8,
      borderBottomWidth: 1,
      paddingVertical: 2,
    },
    hourText: {
      fontFamily: "Poppins-SemiBold",
    },
    map: { width: '100%', height: '100%' },
  });



  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>

        {selectedBip ? (
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
                  rightIconName="chevron-right"
                  onPress={() => { Linking.openURL(`tel:111222334`) }}
                ></FileItem>

                <FileItem
                  name={"biuro@testowo.pl"}
                  details="E-mail"
                  iconBackground={themeColors.background}
                  style={{ backgroundColor: themeColors.background_2, marginTop: 10 }}
                  leftIconName={"mail"}
                  rightIconName="chevron-right"
                  onPress={() => { Linking.openURL(`mailto:biuro@testowo.pl`); }}
                ></FileItem>
                <FileItem
                  name={"Testowa 11A,\n42-400 Testowo"}
                  details="Adres"
                  iconBackground={themeColors.background}
                  style={{ backgroundColor: themeColors.background_2, marginTop: 10, borderBottomRightRadius:0, borderBottomLeftRadius:0 }}
                  leftIconName={"location-on"}
                  rightIconName="chevron-right"
                  onPress={() => {
                    openNavigation(50.4933467, 19.4179835, 'ALPANET');
                  }}
                ></FileItem>
                <View style={{ backgroundColor: themeColors.background_2, height: 250, marginTop:0, padding:15, paddingTop:5, borderRadius: 12, borderTopLeftRadius:0, borderTopRightRadius:0 }}>
                  <MapView
                    userInterfaceStyle={colorSheme == 'dark' ? 'dark' : 'light'}
                    style={[styles.map, { borderRadius: 12 }]}
                    //scrollEnabled={false}
                    
                    rotateEnabled={false}
                    initialRegion={{
                      latitude: 50.4933467,
                      longitude: 19.4179735,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}


                  >
                    <Marker
                      coordinate={{
                        latitude: 50.4933467,
                        longitude: 19.4179835,
                      }}
                      title="ALPANET"
                      description="Polskie Systemy Internetowe"
                    />
                  </MapView>

                </View>
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
                  source={require('../../../assets/images/avatar.webp')}
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

export default ContactHeader;
function useFonts(arg0: { "Poppins-Regular": any; "Poppins-SemiBold": any; "Poppins-Bold": any; "Poppins-Medium": any; }): [any] {
  throw new Error("Function not implemented.");
}

