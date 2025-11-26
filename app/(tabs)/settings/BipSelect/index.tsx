// app/bip/index.tsx
import { Colors } from '@/constants/theme';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, {
    useSharedValue,
    withSequence,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { styles } from '@/assets/styles/select_style';
import { FAKE_CITIES } from '@/constants/data_example';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NUM_DIGITS = 5;



export default function BipFindScreen() {
    const { t } = useTranslation();
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [hasError, setHasError] = useState(false)

    const [digits, setDigits] = useState<string[]>(Array(NUM_DIGITS).fill(''));
    const [isComplete, setIsComplete] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const inputRefs = useRef<(TextInput | null)[]>([]);

    const shake = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shake.value }],
    }));

    useEffect(() => {
        const clearStorage = async () =>{
        await AsyncStorage.removeItem('selectedBipIds');
        await AsyncStorage.removeItem('selectedBipCities');
        }
        setIsComplete(digits.every(d => d.length === 1));
        clearStorage();
    }, [digits]);

    const updateDigit = (val: string, index: number) => {
        const newDigits = [...digits];
        newDigits[index] = val;
        setDigits(newDigits);
    };

    const handleTextChange = (text: string, index: number) => {
        setHasError(false)
        const cleanText = text.replace(/[^0-9]/g, '').slice(0, 1);
        updateDigit(cleanText, index);
        if (cleanText && index < NUM_DIGITS - 1) {
            setTimeout(() => inputRefs.current[index + 1]?.focus(), 10);
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
            updateDigit('', index - 1);
            inputRefs.current[index - 1]?.focus();
        }
    };

    const triggerError = () => {
        setHasError(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        // Shake animation: left → right → left → center
        shake.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withTiming(10, { duration: 50 }),
            withTiming(-10, { duration: 50 }),
            withTiming(10, { duration: 50 }),
            withTiming(0, { duration: 50 })
        );

        // Auto-clear error after 3s
        //setTimeout(() => setHasError(false), 3000);
    };

    const handleFind = async () => {
        const postalCode = digits.join('');
        setIsSearching(true);

        await new Promise(r => setTimeout(r, 1200));

        const results = FAKE_CITIES.filter(c => c.code.startsWith(postalCode));
        setIsSearching(false);

        if (results.length === 0) {
            triggerError()
            return;
        }

        // Navigate using Expo Router
        router.push({
            pathname: '../../settings/BipSelect/select',
            params: { cities: JSON.stringify(results) },
        });
    };

    const handleSkip = () => {
        router.replace('./../'); // go with empty list
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.text }]}>{t('enter_postal_code')}</Text>
                    <Text style={[styles.subtitle, { color: theme.subText }]}>
                        {t('enter_postal_code_subtext')}
                    </Text>

                    <Animated.View style={[animatedStyle]}>
                        <View style={styles.inputContainer}>
                            {digits.map((digit, index) => (
                                <React.Fragment key={index}>
                                    <TextInput
                                        ref={ref => { inputRefs.current[index] = ref; }}
                                        style={[
                                            styles.inputBox,
                                            hasError
                                                ? { borderColor: 'red' }
                                                : digit ? { borderColor: '#0f79d0ff' } : { borderColor: theme.border },
                                            { color: theme.text, backgroundColor: theme.background_2 },
                                        ]}
                                        value={digit}
                                        onChangeText={(text) => handleTextChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        textAlign="center"
                                        placeholderTextColor="#CCCCCC"
                                    />
                                    {index === 1 && <Text style={[styles.separator, { color: theme.subText }]}>-</Text>}
                                </React.Fragment>
                            ))}
                        </View>
                    </Animated.View>

                    <Text style={styles.errorText}>
                        {hasError ? t('no_cities_found_for_code') : ''}
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            isComplete && !isSearching
                                ? { backgroundColor: theme.tint }
                                : { backgroundColor: theme.inactive }
                        ]}
                        onPress={handleFind}
                        disabled={!isComplete || isSearching}
                    >
                        {isSearching ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>{t('find')}</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSkip}>
                        <Text style={[styles.forgotText, { color: theme.text, borderBottomColor: theme.text }]}>
                            {t('continue_without_connect')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

