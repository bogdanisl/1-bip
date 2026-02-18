import { TouchableOpacity, useColorScheme, View, Text } from "react-native";
import { PreviewHeader } from "./components/PreviewHeader";
import FileItem from "@/src/components/buttons/ItemButton";
import { Colors } from "@/src/constants/theme";
import { styles } from '@/assets/styles/select_style';
import { background } from "@expo/ui/swift-ui/modifiers";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

const features = [
    { id: "0", title: "Centralny dostęp", text: "Przeglądaj informacje z wielu jednostek administracyjnych w jednym miejscu. Połącz konta różnych urzędów.", icon: "hub" },

    { id: "1", title: "Informacje Urzędowe", text: "Przeglądaj informacje z wielu jednostek administracyjnych w jednym miejscu. Połącz konta różnych urzędów.", icon: "apartment" },

    { id: "2", title: "Bieżące dokumenty", text: "Śledź najnowsze uchwały i ogłoszenia bezpośrednio w aplikacji. Uzyskaj natychmiastowy wgląd w aktualne decyzje podejmowane przez urzędy.", icon: "file-open" },

];

export default function AboutAppScreen() {
    const theme = useColorScheme() == 'dark' ? Colors.dark : Colors.light;

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
                paddingHorizontal: 24,
            }}>

                <FlatList
                    keyExtractor={item => item.id}
                    style={{ paddingVertical: 20 }}
                    data={features}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    renderItem={renderFeature}
                    ListFooterComponent={()=><View style={{height:200}}/>}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <TouchableOpacity
                onPress={() => { router.push('/(preview)/selector') }}
                style={[
                    {
                        position: 'absolute',
                        bottom: 100, // odstęp od dolnej krawędzi
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
                <Text style={styles.buttonText}>{`Rozpocznij`}</Text>
            </TouchableOpacity>
        </View>
    )
}