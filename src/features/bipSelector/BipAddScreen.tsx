// app/bip/select.tsx
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
    ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { Bip } from '@/src/types/Bip';
import { updateAllData } from '@/src/services/storage/updateData';
import { storage } from '@/src/services/storage/asyncStorage';
import { MaterialIcons } from '@expo/vector-icons';
import Logo from '@/assets/images/icon_svg.svg';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import Animated from 'react-native-reanimated';
import { EmptyState } from '@/src/components/EmptyState';
import { BlurView } from 'expo-blur';



export default function SelectBipScreen() {
    const { t } = useTranslation();
    var he = require('he');
    const { theme } = useAppTheme();
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const { cities: citiesJson } = useLocalSearchParams();


    const params = useLocalSearchParams<{ q?: string }>();
    const searchText = params?.q?.toLowerCase() || "";


    const cities: Bip[] = citiesJson ? JSON.parse(citiesJson as string) : [];

    const filteredResults = searchText && cities ? cities.filter((city) => {
        return city.name.toLowerCase().includes(searchText)
    }) : cities ?? [];

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
                    styles.item,
                    {
                        backgroundColor: theme.background_2,
                        borderColor: isSelected ? theme.tint : theme.background_2,
                    },
                ]}
                onPress={() => toggleCity(item.id)}
                activeOpacity={0.7}
            >
                <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, { color: theme.text }]}>
                        {he.decode(item.name ?? item.name)}
                    </Text>
                    {/* {item.institution_name && (
            <Text style={[styles.itemSub, { color: theme.subText }]}>
              {item.institution_name}
            </Text>
          )} */}

                </View>
                <Logo width={50} height={40} fill={theme.tint} style={{ marginHorizontal: 20 }} />
                <View
                    style={[
                        styles.checkbox,
                        {
                            backgroundColor: isSelected ? theme.tint : 'transparent',
                            borderColor: isSelected ? theme.tint : theme.border,
                        },
                    ]}
                >
                    {isSelected && (
                        <MaterialIcons name="check" size={20} color="white" />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <Animated.FlatList
                    data={filteredResults}
                    ListHeaderComponent={
                        <Text style={[styles.subtitle, { color: theme.subText }]}>
                            {t('select_bip_desc')}
                        </Text>
                    }
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10, paddingBottom: 180, paddingHorizontal: 16 }}
                    ListEmptyComponent={
                        <EmptyState
                            iconName='search-off'
                            title={t('not_found_bip_for', { searchText })}
                            description={t('other_bips_count', { count: cities.length })}
                        />
                    }
                />
                <BlurView style={{
                    // backgroundColor: theme.background_2,
                    borderRadius: 16,
                    position: 'absolute',
                    bottom: 100,
                    left: 24,
                    right: 24,
                }}
                    intensity={10}
                >
                    <TouchableOpacity
                        style={[
                            styles.button,
                            selectedIds.size > 0 && !isLoading
                                ? { backgroundColor: theme.tint }
                                : { backgroundColor: theme.inactive },
                        ]}
                        onPress={handleContinue}
                        disabled={selectedIds.size === 0 || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>
                                {t('save')}
                            </Text>
                        )}
                    </TouchableOpacity>
                </BlurView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        position: 'relative', // важно

    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 8,
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginBottom: 16,
        paddingLeft: 5,
        textAlign: 'left',
    },
    list: {
        flex: 1,
    },
    emptyText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginTop: 32,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
    },
    itemInfo: {
        flex: 1,
        gap: 4,
    },
    itemName: {
        fontSize: 16,
        paddingRight: 30,
        fontFamily: 'Poppins-SemiBold',
    },
    itemSub: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
    },
    typeBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
        marginTop: 4,
    },
    typeBadgeText: {
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
});