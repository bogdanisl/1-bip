// app/(tabs)/employees/EmployeesPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { Employee } from '@/src/types/Employee';
import { exampleEmployees } from '@/src/constants/data_example';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { storage } from '@/src/services/storage/asyncStorage';
import { EmptyState } from '@/src/components/EmptyState';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/src/services/api/client';

export default function EmployeesPage() {
    const { theme } = useAppTheme();
    const { t } = useTranslation();
    const params = useLocalSearchParams<{ q?: string }>();
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const [editors, setEditors] = useState<Employee[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const searchText = params?.q?.toLowerCase() || "";
    //Agnconsole.log(searchText)
    const handlePress = (employee: Employee) => {
        router.push(`/(tabs)/home/editors/${employee.id}`)
    };

    const loadEditors = async () => {
        if (selectedBip == null) {
            setEditors(exampleEmployees)
            return;
        }
        const savedEmployees = await storage.get<Employee[]>(`${selectedBip?.id}/editors`);
        if (savedEmployees) {
            setEditors(savedEmployees);
            return;
        }
        else {
            setEditors([]);
            return;
        }
    }

    useEffect(() => {
        loadEditors();
    }, [])

    const handleRefresh = async () => {
        setRefreshing(true);
        const updateEditors = async () => {
            if (!selectedBip) return;
            const publishers = await apiRequest<Employee[]>('/api/v1/publisher/list', {}, selectedBip);
            if (publishers) {
                storage.remove(`${selectedBip.id}/editors`);
                storage.set<Employee[]>(`${selectedBip.id}/editors`, publishers)
            }
        }
        await updateEditors();
        await loadEditors();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000)

    };

    const filteredSpeakers = editors.filter((employee) => {
        if (!searchText) {
            return true;
        }
        return employee.name ? employee.name.toLowerCase().includes(searchText) : employee.surname ? employee.surname.toLowerCase().includes(searchText) : '';
    });

    const renderEmployee = ({ item }: { item: Employee }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.background_2 }]}
            onPress={() => handlePress(item)}
            activeOpacity={0.7}
        >
            <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
                        <MaterialIcons name="person" size={24} color={theme.tint} />
                    </View>
                    <View
                        style={{
                            width: '70%'
                        }}
                    >
                        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                        {item.position &&
                            <Text style={[styles.function, { color: theme.subText }]}>{item.position}</Text>
                        }
                    </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={theme.subText} />
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Stack.Screen
                options={filteredSpeakers.length > 0 ? {
                    headerSearchBarOptions: {
                        headerIconColor: theme.icon,
                        tintColor: theme.tint,
                        textColor: theme.text,
                        hintTextColor: theme.tint,
                        placeholder: t('home.search_editor'),
                        onChangeText: (event) => {
                            router.setParams({
                                q: event.nativeEvent.text,
                            });
                        },
                    },

                } : {}}
            />
            <Animated.FlatList
                style={{ padding: 20 }}
                data={filteredSpeakers}
                itemLayoutAnimation={LinearTransition}
                renderItem={renderEmployee}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.tint}
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        iconName='group'
                        onRefresh={handleRefresh}
                        loading={refreshing}
                    />
                }
                contentInsetAdjustmentBehavior={'automatic'}
            />

        </>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
    },
    function: {
        fontSize: 14,
        marginTop: 2,
    },
});
