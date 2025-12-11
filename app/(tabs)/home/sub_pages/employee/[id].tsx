// app/(tabs)/employees/[id].tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { exampleEmployees } from '@/constants/data_example';
import { showMessage } from 'react-native-flash-message';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useTranslation } from 'react-i18next';

export default function EmployeeDetailPage() {
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const { id } = useLocalSearchParams<{ id: string }>();
    const { t } = useTranslation();
    const employeeId = Number(id);
    const employee = exampleEmployees.find((e) => e.id === employeeId);

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

    const renderInfoRow = (icon: any, value: string | number, onPress: () => void, subText?: string,) => (
        <View
            style={[
                styles.infoCard,
                {
                    backgroundColor: theme.background_2,
                    flexDirection: 'row',
                    alignItems: 'center',          // This is the key: vertically centers all children
                    paddingVertical: 12,          // Optional: consistent height
                    shadowColor: theme.text,
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 3,
                },
            ]}
        >
            {/* Icon on the left */}
            <View style={[styles.iconCircle, { backgroundColor: theme.background }]}>
                <MaterialIcons name={icon} size={20} color={theme.tint} />
            </View>

            {/* Text container - takes remaining space */}

            <Text style={[styles.infoText, { color: theme.text }]} onPress={onPress}>
                {value}
                {subText && (<Text style={[styles.infoText, { color: theme.subText, fontSize: 12 }]} onPress={onPress}>
                    {`\n` + subText}
                </Text>
                )}
            </Text>
            {/* Copy button */}
            <TouchableOpacity onPress={() => copyToClipboard(value)}>
                <MaterialIcons name="content-copy" size={20} color={theme.subText} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{ backgroundColor: 'transparent', padding: 16 }}>
            <View style={[styles.card, { backgroundColor: Platform.OS == 'ios' ? isLiquidGlassAvailable() ? 'transparent' : theme.background : theme.background }]}>
                <View style={[styles.iconCircle, { backgroundColor: theme.background_2, width: 70, height: 70, borderRadius: 50, marginRight: 0, marginBottom: 10 }]}>
                    <MaterialIcons name={'person'} size={60} color={theme.text} />
                </View>
                <Text style={[styles.name, { color: theme.text }]}>{employee.name} {employee.surname}</Text>
                <Text style={[styles.function, { color: theme.subText, marginBottom: 16 }]}>{employee.position}</Text>

                {employee.phone && renderInfoRow('phone-iphone', employee.phone, () => openPhone(employee.phone!))}
                {employee.extension && renderInfoRow('phone', employee.extension, () => openPhone(employee.extension!), t('phone_inside'))}
                {employee.email &&renderInfoRow('email', employee.email, () => openEmail(employee.email!))}
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
        elevation: 3,
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
