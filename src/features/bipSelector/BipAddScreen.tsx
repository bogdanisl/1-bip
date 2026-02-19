// app/bip/select.tsx
import { Colors } from '@/src/constants/theme';
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
    ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { styles } from '@/assets/styles/select_style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { Bip } from '@/src/types/Bip';
import { updateAllData } from '@/src/services/storage/updateData';
import { storage } from '@/src/services/storage/asyncStorage';
import { MaterialIcons } from '@expo/vector-icons';



export default function SelectBipScreen() {
    const { t } = useTranslation();
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const { cities: citiesJson } = useLocalSearchParams();

    const cities: Bip[] = citiesJson ? JSON.parse(citiesJson as string) : [];
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);

    const toggleCity = (id: string) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const handleContinue = async () => {
        setIsLoading(true);
        const selected = cities.filter(c => selectedIds.has(c.id));

        try {
            await storage.remove(`1/hours`)
            await storage.remove(`1/employees`)
            // Save selected city IDs (or full objects — up to you)
            const selectedIdsArray = Array.from(selectedIds); // Set → Array
            await AsyncStorage.setItem('selectedBipIds', JSON.stringify(selectedIdsArray));
            await AsyncStorage.setItem('selectedBipCities', JSON.stringify(selected));
            useSelectedBipStore.getState().setSelectedBip(selected[0]);
            //console.log('Selected BIP saved:', selected.map(c => c.name));
        } catch (error) {
            console.error('Failed to save selected BIP:', error);
            Alert.alert(t('error'), t('save_failed'));
            setIsLoading(false);
            return; // Don't navigate if save failed
        }

        // Navigate back to main screen (or home)
        await updateAllData();
        router.replace('./../../', {

        });
        setIsLoading(false);
        // Alternative: router.back() if you want simple back
    };

    const renderItem = ({ item }: { item: Bip }) => {
        const isSelected = selectedIds.has(item.id);

        return (
            <TouchableOpacity
                style={[
                    styles.cityItem,
                    {
                        backgroundColor: theme.background_2,
                        borderColor: isSelected ? theme.tint : theme.background_2,
                        borderWidth: isSelected ? 2 : 2
                    },
                ]}
                onPress={() => toggleCity(item.id)}
                activeOpacity={0.7}
            >
                <Text style={[styles.cityName, { color: theme.text }]}>{item.name}</Text>
                {/* <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                    {isSelected && <View style={styles.checkmark} />}
                </View> */}
                <View style={{
                    backgroundColor: isSelected ? theme.tint : 'transparent',
                    borderWidth: 1,
                    borderColor: isSelected? theme.tint :theme.border,
                    width: 28,
                    height: 28,
                    borderRadius: 5
                }}>
                    {isSelected &&
                        <MaterialIcons name='check' size={26} color={'white'} />
                    }
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
                            disabled={selectedIds.size === 0 || isLoading}
                        >
                            {isLoading ?
                                <ActivityIndicator color="#FFFFFF" />
                                :
                                <Text style={styles.buttonText}>
                                    {t('save')}
                                </Text>
                            }
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}