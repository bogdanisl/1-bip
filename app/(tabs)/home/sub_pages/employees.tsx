// app/(tabs)/employees/EmployeesPage.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Employee } from '@/types/Employee';
import { router, useLocalSearchParams } from 'expo-router';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { fetchEmployees } from '@/utils/data';
import { storage } from '@/utils/storage/asyncStorage';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';

export default function EmployeesPage() {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const params = useLocalSearchParams<{ q?: string }>();
    const [employees, setEmplpoyees] = useState<Employee[]>([])
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);

    const searchText = params?.q?.toLowerCase() || "";
    //Agnconsole.log(searchText)
    const handlePress = (employee: Employee) => {
        // Empty function for now
        router.push(`../../../(tabs)/home/sub_pages/employee/${employee.id}`)
      //  console.log('Pressed employee:', employee.name);
    };

    useEffect(() => {

        const getEmployee = async () => {
            const fetchedEmployees = await storage.get<Employee[]>(`${selectedBip?.id}/employees`);
            if (fetchedEmployees) {
                setEmplpoyees(fetchedEmployees)
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
