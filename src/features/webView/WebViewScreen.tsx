// app/pdf-viewer.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    Linking,
} from 'react-native';
import { Stack } from 'expo-router/stack';
import { WebView } from 'react-native-webview';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { useColorScheme } from '@/src/hooks/use-color-scheme.web';
import { Colors } from '@/src/constants/theme';
import { router } from 'expo-router';
import { Animated } from 'react-native';
import { useRef } from 'react';

interface WebViewScreenProps {
    link: string,
    name: string,
}

const WebViewScreen = ({ link, name }: WebViewScreenProps) => {

    const themeColors = useColorScheme() == 'dark' ? Colors.dark : Colors.light;

    const handleOpenInBrowser = async () => {
        Linking.openURL(link);
    }

    const scrollY = useRef(new Animated.Value(0)).current;
    const paddingTop = useRef(new Animated.Value(
        isLiquidGlassAvailable() ? 70 : 0
    )).current;

    const lastScrollY = useRef(0);

    const handleScroll = (event: any) => {
        if (!isLiquidGlassAvailable()) return;

        const currentY = event.nativeEvent.contentOffset.y;
        const delta = currentY - lastScrollY.current;

        if (delta > 0) {
            const newPadding = Math.max(70 - currentY, 0);
            paddingTop.setValue(newPadding);
        }

        if (delta < 0) {
            Animated.timing(paddingTop, {
                toValue: 70,
                duration: 120,
                useNativeDriver: false,
            }).start();
        }

        lastScrollY.current = currentY;
    };

    const AnimatedWebView = Animated.createAnimatedComponent(WebView);

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: name,
                    headerBlurEffect: isLiquidGlassAvailable() ? 'none' : 'light',
                    headerTitleStyle: { color: 'black'},
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ height: 34, width: 34, justifyContent: 'center', alignItems: 'center' }}
                            onPress={handleOpenInBrowser}
                        >
                            <FontAwesome
                                name={Platform.OS === 'ios' ? 'safari' : 'chrome'}
                                size={24}
                                color={isLiquidGlassAvailable() ? 'black' : themeColors.tint}
                                style={{ paddingLeft: 2, paddingBottom: 2 }}
                            />
                        </TouchableOpacity>
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => { router.back() }} style={{ width: 34, height: 34, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialIcons name='close' size={28} color={isLiquidGlassAvailable() ? 'black' : themeColors.tint} style={isLiquidGlassAvailable() ? { paddingLeft: 2 } : {}}></MaterialIcons>
                        </TouchableOpacity>
                    ),
                }}
            />

            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <AnimatedWebView
                    source={{ uri: link }}
                    style={{ flex: 1 }}
                    containerStyle={
                        { paddingTop: isLiquidGlassAvailable() ? paddingTop : 70 }
                    }
                    allowsFullscreenVideo
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState

                    onScroll={
                        handleScroll
                    }
                    renderLoading={() => (
                        <View style={styles.loadingOverlay}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    )}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unsupportedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    fileName: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
    },
    fileSize: {
        fontSize: 16,
        marginTop: 8,
    },
    hint: {
        fontSize: 14,
        marginTop: 16,
        textAlign: 'center',
    },
});

export default WebViewScreen;