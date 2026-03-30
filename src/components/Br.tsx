import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
    theme: any;
}
export function Br({ theme }: Props) {
    return (
        <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: theme.tint }]} />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        progressContainer: {
            height: 4,
            backgroundColor: '#444',
            borderRadius: 2,
            overflow: 'hidden',
            marginBottom: 12,
        },
        progressBar: {
            height: '100%',
            width: '40%',
            borderRadius: 2,
        },
    }
)
