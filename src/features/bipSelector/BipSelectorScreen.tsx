import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Alert,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';
import { Bip } from '@/src/types/Bip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { useTranslation } from 'react-i18next';

const BipSelectorScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const { t } = useTranslation();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const setSelectedBip = useSelectedBipStore((s) => s.setSelectedBip);

    const [savedBips, setSavedBips] = useState<Bip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('selectedBipCities');
                if (jsonValue) {
                    const parsed: Bip[] = JSON.parse(jsonValue);
                    setSavedBips(parsed);

                    // savedBips.find(i=>i.id==selectedBip?.id)
                }
            } catch (error) {
                console.error('Failed to load BIP cities:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleSelectBip = async (bip: Bip) => {
        try {
            setSelectedBip(bip);
            router.back();
        } catch (error) {
            console.error('Failed to save BIP city:', error);
        }
    };

    const handleChangeBip = async () => {
        Alert.alert(
            t('change_bip_title'),
            t('change_bip_message'),
            [
                {
                    text: t('cancel'),
                    style: 'cancel',
                },
                {
                    text: t('continue'),
                    style: 'destructive',
                    onPress: () => {
                        router.replace('/(preview)/selector');
                    },
                },
            ],
            { cancelable: true }
        );
        //router.replace('/(preview)/selector');
    }

    const renderItem = ({ item }: { item: Bip }) => {
        const isSelected = selectedBip?.id === item.id;

        return (
            <TouchableOpacity
                style={[styles.item, { backgroundColor: theme.background_2 }]}
                onPress={() => handleSelectBip(item)}
                activeOpacity={0.7}
            >
                <Text style={[styles.cityName, {
                    color: theme.text,
                    maxWidth: '75%',
                }]}>{item.name}</Text>

                {isSelected ? (
                    <MaterialIcons name="check" size={26} color={theme.text} />
                ) : (
                    <View style={styles.placeholder} />
                )}
            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <ActivityIndicator size="large" color={theme.tint} />
            </View>
        );
    }

    return (
        <FlatList
            data={savedBips}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
                <TouchableOpacity
                    onPress={handleChangeBip}
                    style={[styles.item, { backgroundColor: theme.tint }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="feed" size={26} color={'white'} />
                        <Text style={[styles.cityName, { color: 'white', paddingLeft: 15 }]}>{t('change_bip_connection')}</Text>
                    </View>
                    <MaterialIcons name='chevron-right' size={26} color={'white'} />
                </TouchableOpacity>
            }
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 40 }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 12,
    },
    cityName: {
        fontSize: 18,
        fontWeight: '500',
    },
    placeholder: {
        width: 26,
        height: 26,
    },
});

export default BipSelectorScreen;