import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';
import { Bip } from '@/src/types/Bip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';

const BipSelectorScreen = () => {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
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
            useSelectedBipStore.getState().setSelectedBip(bip);
            router.back();
        } catch (error) {
            console.error('Failed to save BIP city:', error);
        }
    };

    const renderItem = ({ item }: { item: Bip }) => {
        const isSelected = selectedBip?.id === item.id;

        return (
            <TouchableOpacity
                style={[styles.item, { backgroundColor: theme.background_2 }]}
                onPress={() => handleSelectBip(item)}
                activeOpacity={0.7}
            >
                <Text style={[styles.cityName, { color: theme.text }]}>{item.name}</Text>

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
        <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
            <FlatList
                data={savedBips}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20,paddingTop:40 }}
            />
        </SafeAreaView>
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