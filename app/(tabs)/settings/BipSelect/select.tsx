// app/bip/select.tsx
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Alert,
    useColorScheme,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { styles } from '@/assets/styles/select_style';
import AsyncStorage from '@react-native-async-storage/async-storage';

type City = {
    id: string;
    code: string;
    name: string;
};

export default function SelectBipScreen() {
    const { t } = useTranslation();
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const { cities: citiesJson } = useLocalSearchParams();

    const cities: City[] = citiesJson ? JSON.parse(citiesJson as string) : [];
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleCity = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const handleContinue = async () => {
        const selected = cities.filter(c => selectedIds.has(c.id));

        try {
            // Save selected city IDs (or full objects — up to you)
            const selectedIdsArray = Array.from(selectedIds); // Set → Array
            await AsyncStorage.setItem('selectedBipIds', JSON.stringify(selectedIdsArray));

            // Optional: save full city objects for faster access later
            await AsyncStorage.setItem('selectedBipCities', JSON.stringify(selected));

            console.log('Selected BIP saved:', selected.map(c => c.name));
        } catch (error) {
            console.error('Failed to save selected BIP:', error);
            Alert.alert(t('error'), t('save_failed'));
            return; // Don't navigate if save failed
        }

        // Navigate back to main screen (or home)
        router.replace('./../../'); // or router.replace('./../../') if you're deeper
        // Alternative: router.back() if you want simple back
    };

    const renderItem = ({ item }: { item: City }) => {
        const isSelected = selectedIds.has(item.id);

        return (
            <TouchableOpacity
                style={[
                    styles.cityItem,
                    {
                        backgroundColor: theme.background_2,
                        borderColor: theme.background
                    },
                    isSelected && styles.cityItemSelected,
                ]}
                onPress={() => toggleCity(item.id)}
                activeOpacity={0.7}
            >
                <Text style={[styles.cityName, { color: theme.text }]}>{item.name}</Text>
                <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                    {isSelected && <View style={styles.checkmark} />}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.content_select}>
                <Text style={[styles.title, { color: theme.text, alignSelf: 'center' }]}>{t('select_bip')}</Text>

                {cities.length === 0 ? (
                    <Text style={[styles.emptyText, { color: theme.subText }]}>
                        {t('no_bip_found')}
                    </Text>
                ) : (
                    <>
                        <Text style={[styles.subtitle, { color: theme.subText }]}>
                            {t('select_bip_desc')}
                        </Text>

                        <FlatList
                            data={cities}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            style={styles.list}
                            showsVerticalScrollIndicator={true}
                        />

                        <TouchableOpacity
                            style={[
                                styles.button,
                                selectedIds.size > 0
                                    ? { backgroundColor: theme.tint }
                                    : { backgroundColor: theme.inactive }
                            ]}
                            onPress={handleContinue}
                            disabled={selectedIds.size === 0}
                        >
                            <Text style={styles.buttonText}>
                                {t('save')}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}