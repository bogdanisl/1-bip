import ContactForm from "@/src/features/tabs/contact/components/contactForm";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
    Image,
    Linking,
    ScrollView,
    Text,
    View,
} from "react-native";
import { createContactStyles } from "./ContactScreenStyles";
import { useAppTheme } from '@/src/hooks/use-theme-colors';



const PreviewContactScreen = () => {
    const { t } = useTranslation();
    const { theme: themeColors } = useAppTheme();
    const styles = useMemo(
        () => createContactStyles(themeColors),
        [themeColors]
    );

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
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
    );
};

export default PreviewContactScreen;

