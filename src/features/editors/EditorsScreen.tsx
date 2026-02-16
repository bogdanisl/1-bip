// app/(tabs)/employees/EmployeesPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Employee } from '@/types/Employee';
import { exampleEmployees } from '@/constants/data_example';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { storage } from '@/utils/storage/asyncStorage';

export default function EmployeesPage() {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const params = useLocalSearchParams<{ q?: string }>();
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);
    const [editors, setEditors] = useState<Employee[]>([]);

    const searchText = params?.q?.toLowerCase() || "";
    //Agnconsole.log(searchText)
    const handlePress = (employee: Employee) => {
        router.push(`/(tabs)/home/editors/${employee.id}`)
    };

    useEffect(() => {
        const getEmployee = async () => {
            if (selectedBip == null) {
                setEditors(exampleEmployees)
                return;
            }
            const savedEmployees = await storage.get<Employee[]>(`${selectedBip?.id}/editors`);
            if (savedEmployees) {
                setEditors(savedEmployees)
                return;
            }
            else {
                setEditors([]);
                return;
            }
        }
        getEmployee();
    }, [])

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
                    <MaterialIcons name="person" size={24} color={theme.tint} style={{ marginRight: 12 }} />
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
