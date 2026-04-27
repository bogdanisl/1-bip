// app/(tabs)/employees/EmployeesPage.tsx
import React, { useEffect, useState, useTransition } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, Dimensions, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/src/hooks/use-theme-colors';
import { Employee } from '@/src/types/Employee';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { storage } from '@/src/services/storage/asyncStorage';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { exampleEmployees } from '@/src/constants/data_example';
import { useTranslation } from 'react-i18next';
import { Br } from '@/src/components/Br';
import { apiRequest } from '@/src/services/api/client';
import { EmptyState } from '@/src/components/EmptyState';

export default function EmployeesScreen() {
    const { theme } = useAppTheme();
    const params = useLocalSearchParams<{ q?: string }>();
    const [employees, setEmplpoyees] = useState<Employee[]>([])
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(false);

    const searchText = params?.q?.toLowerCase() || "";
    const handlePress = (employee: Employee) => {
        router.push(`/(tabs)/home/employees/${employee.id}`)
    };

    const loadEmployees = async () => {
        if (selectedBip == null) {
            setEmplpoyees(exampleEmployees);
            return;
        }

        const savedEmployees = await storage.get<Employee[]>(
            `${selectedBip.id}/employees`
        );

        if (savedEmployees) {
            setEmplpoyees(savedEmployees);
        } else {
            setEmplpoyees([]);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, [selectedBip])

    const handleRefresh = async () => {
        setRefreshing(true);
        const updateEmpoyees = async () => {
            if (!selectedBip) return;
            const employees = await apiRequest<Employee[]>('/api/v1/employee/list', {}, selectedBip);
            if (employees) {
                storage.remove(`${selectedBip.id}/employees`);
                storage.set<Employee[]>(`${selectedBip.id}/employees`, employees)
            }
        }
        await updateEmpoyees();
        await loadEmployees();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000)

    };

    const filteredSpeakers = employees.filter((employee) => {
        if (!searchText) {
            return true;
        }
        return employee.name ? employee.name.toLowerCase().includes(searchText) : employee.surname?.toLowerCase().includes(searchText);
    });

    const renderEmployee = ({ item }: { item: Employee }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.background_2 }]}
            onPress={() => handlePress(item)}
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
                        {
                            item.position &&
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
                        placeholder: t('home.search_employee'),
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
                // scrollEnabled={filteredSpeakers.length > 0}
                data={filteredSpeakers}
                itemLayoutAnimation={LinearTransition}
                renderItem={renderEmployee}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={<>
                    <View style={{ height: 50 }}></View>
                </>}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.tint}
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        iconName='work'
                        onRefresh={handleRefresh}
                        loading={refreshing}
                    />
                }
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
