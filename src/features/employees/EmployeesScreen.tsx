// app/(tabs)/employees/EmployeesPage.tsx
import React, { useEffect, useState, useTransition } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Colors } from '@/src/constants/theme';
import { Employee } from '@/src/types/Employee';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { fetchEmployees } from '@/src/services/api/data';
import { storage } from '@/src/storage/asyncStorage';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { exampleEmployees } from '@/src/constants/data_example';
import { useTranslation } from 'react-i18next';

export default function EmployeesScreen() {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const params = useLocalSearchParams<{ q?: string }>();
    const [employees, setEmplpoyees] = useState<Employee[]>([])
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const { t } = useTranslation();

    const searchText = params?.q?.toLowerCase() || "";
    const handlePress = (employee: Employee) => {
        router.push(`/(tabs)/home/employees/${employee.id}`)
    };

    useEffect(() => {
        const getEmployee = async () => {
            if(selectedBip == null){
                setEmplpoyees(exampleEmployees)
                return;
            }
            const savedEmployees = await storage.get<Employee[]>(`${selectedBip?.id}/employees`);
            if (savedEmployees) {
                setEmplpoyees(savedEmployees)
                return;
            }
            else{
                setEmplpoyees([]);
                return;
            }
        }
        getEmployee();
    }, [])

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
                    <View>
                        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                        <Text style={[styles.function, { color: theme.subText }]}>{item.position}</Text>
                    </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={theme.subText} />
            </View>
        </TouchableOpacity>
    );

    return (
        <Animated.FlatList
            style={{ padding: 20 }}
            data={filteredSpeakers}
            itemLayoutAnimation={LinearTransition}
            renderItem={renderEmployee}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={<>
            <View style={{height:50}}></View>
            </>}
            ListEmptyComponent={
                  <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
                          <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', marginBottom: 10, marginTop: 10 }}>
                            {t('no_data')}
                          </Text>
                        </View>
            }
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            contentInsetAdjustmentBehavior={'automatic'}
        />
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
