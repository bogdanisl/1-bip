import { TouchableOpacity, useColorScheme, View, Text, Platform } from "react-native";
import { PreviewHeader } from "./components/PreviewHeader";
import FileItem from "@/src/components/buttons/ItemButton";
import { Colors } from "@/src/constants/theme";
import { styles } from '@/assets/styles/select_style';
import { background } from "@expo/ui/swift-ui/modifiers";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const useFeatures = () => {
  const { t } = useTranslation();

  const features = [
    { id: "0", title: t('welcome_screen.features.central_access.title'), text: t('welcome_screen.features.central_access.desc'), icon: "hub" },
    { id: "1", title: t('welcome_screen.features.official_info.title'), text: t('welcome_screen.features.official_info.desc'), icon: "apartment" },
    { id: "2", title: t('welcome_screen.features.current_documents.title'), text: t('welcome_screen.features.current_documents.desc'), icon: "file-open" },
  ];

  return features;
};

export default function AboutAppScreen() {
    const { t } = useTranslation();
    const theme = useColorScheme() == 'dark' ? Colors.dark : Colors.light;

   const features = useFeatures();

    const renderFeature = ({ item }: { item: any }) => {
        return (
            <FileItem style={{ backgroundColor: theme.background_2 }}
                leftIconName={item.icon}
                details={item.text}
                name={item.title}
                activeOpacity={1}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <PreviewHeader />
            <View style={{
                flex: 1,
            }}>

                <FlatList
                    keyExtractor={item => item.id}
                    style={{ padding: 20 }}
                    data={features}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    renderItem={renderFeature}
                    ListFooterComponent={() => <View style={{ height: 200 }} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <TouchableOpacity
                onPress={() => { router.push('/(preview)/selector') }}
                style={[
                    {
                        position: 'absolute',
                        bottom: Platform.OS == 'android'? 10: 90, // odstęp od dolnej krawędzi
                        left: 24,
                        right: 24,
                        paddingVertical: 16,
                        borderRadius: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.tint,
                    }
                ]}
            >
                <Text style={styles.buttonText}>{t('welcome_screen.get_started')}</Text>
            </TouchableOpacity>
        </View>
    )
}