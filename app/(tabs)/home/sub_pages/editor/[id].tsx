// app/(tabs)/employees/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { exampleEmployees } from '@/constants/data_example';
import { showMessage } from 'react-native-flash-message';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useTranslation } from 'react-i18next';
import { Employee } from '@/types/Employee';
import { storage } from '@/utils/storage/asyncStorage';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import FileItem from '@/components/buttons/ItemButton';

export default function EmployeeDetailPage() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
    const { id } = useLocalSearchParams<{ id: string }>();
    const selectedBip = useSelectedBipStore((state) => state.selectedBip);

    const { t } = useTranslation();
    const employeeId = Number(id);
    const [employee, setEmployee] = useState<Employee>()

    useEffect(() => {
        const findEmployee = async () => {
            if (selectedBip == null) {
                const found = exampleEmployees.find((e) => e.id === employeeId);
                if (found) {
                    setEmployee(found);
                }
                return;
            }
            const editors = await storage.get<Employee[]>(`${selectedBip?.id}/editors`);
            if (editors) {
                const found = editors.find((e) => e.id === employeeId);
                if (found) {
                    setEmployee(found);
                }
            }
        }
        findEmployee();
    }, [])

    if (!employee) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <Text style={{ color: theme.text }}>Nie znaleziono pracownika.</Text>
            </View>
        );
    }

    const openPhone = (number: number) => {
        Linking.openURL(`tel:${number}`);
    };

    const openEmail = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    const copyToClipboard = (value: string | number) => {
        // Clipboard(value.toString());
        showMessage({
            message: 'Skopiowano do schowka!',
            type: 'success',
        });
    };

    const renderInfoRow = (icon: any, value: string | number, onPress: () => void, subText?: string, rightIcon?: any) => (
        <FileItem
            name={String(value)}
            details={subText}
            leftIconName={icon}
            onPress={onPress}
            rightIconName={rightIcon}
            style={{ backgroundColor: colorScheme == 'dark' ? theme.background : theme.background_2 }}
            iconBackground={colorScheme == 'dark' ? theme.background_2 : theme.background}
        />
    );

    return (
        <View style={{ backgroundColor: 'transparent', padding: 16 }}>
            <View style={[styles.card, { backgroundColor: Platform.OS == 'ios' ? isLiquidGlassAvailable() ? 'transparent' : 'transparent' : theme.background }]}>
                <View style={[styles.iconCircle, { backgroundColor: colorScheme == 'dark'? theme.background : theme.background_2, width: 70, height: 70, borderRadius: 50, marginRight: 0, marginBottom: 10 }]}>
                    <MaterialIcons name={'person'} size={60} color={theme.text} />
                </View>
                <Text style={[styles.name, { color: theme.text }]}>{employee.name} {employee.surname}</Text>
                <Text style={[styles.function, { color: theme.subText, marginBottom: 16 }]}>{employee.position}</Text>
                <View style={{ gap: 10, width: '100%' }}>

                    {employee.phone && renderInfoRow('phone-iphone', employee.phone, () => openPhone(employee.phone!), t('phone'), 'call-made')}
                    {employee.extension && renderInfoRow('phone', employee.extension, () => openPhone(employee.extension!), t('phone_inside'), 'call-made')}
                    {employee.email && renderInfoRow('email', employee.email, () => openEmail(employee.email!), t('email'), 'message')}
                </View>
                {/* {renderInfoRow('phone', employee.email, () => openEmail(employee.email))} */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    name: { fontSize: 20, fontWeight: 'bold' },
    function: { fontSize: 16 },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginTop: 12,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 16,
    },
});
