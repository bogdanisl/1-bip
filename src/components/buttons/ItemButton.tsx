import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { background } from '@expo/ui/swift-ui/modifiers';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useAppTheme } from '@/src/hooks/use-theme-colors';

interface FileItemProps extends TouchableOpacityProps {
    name: string; // required
    details?: string; // optional
    detailsAccent?: string; // optional
    leftIconName?: string; // required
    rightIconName?: string; // optional
    iconBackground?: string; // optional
}

const FileItem: React.FC<FileItemProps> = ({
    name,
    details,
    detailsAccent,
    leftIconName,
    rightIconName,
    iconBackground,
    style,
    ...touchableProps
}) => {
    const { theme } = useAppTheme();
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: theme.background, shadowColor: '#000', shadowOpacity: isLiquidGlassAvailable() ? 0 : 0 }, style]}
            {...touchableProps}
        >
            {/* Left Icon */}
            {leftIconName &&
                <View style={[styles.leftIconContainer, {
                    backgroundColor: iconBackground || theme.background_2
                }]}>
                    <MaterialIcons name={(leftIconName as any)} size={24} color={theme.tint} />
                </View>
            }

            {/* Texts */}
            <View style={{ flex: 1, marginRight: 20 }}>
                <Text style={[styles.filename, { color: theme.text }]}>
                    {name}
                </Text>
                <View style={{flexDirection:'row'}}>
                    {details && (
                        <Text style={[styles.details, { color: theme.subText }]}>
                            {details}
                        </Text>
                    )}
                    {detailsAccent && (
                        <Text style={[styles.details, { color: theme.tint }]}>
                            {detailsAccent}
                        </Text>
                    )}
                </View>
            </View>

            {/* Right Icon */}
            {rightIconName && (
                <MaterialIcons name={(rightIconName as any)} size={24} color={theme.subText} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 16,
        shadowOpacity: 0,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    leftIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    filename: {
        fontSize: 16,
    },
    details: {
        fontSize: 14,
    },
});

export default FileItem;
