import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Br() {
    return (
        <View style={styles.progressContainer}>
            <View style={[styles.progressBar]} />
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
            backgroundColor: '#b50315',
            height: '100%',
            width: '40%',
            borderRadius: 2,
        },
    }
)
