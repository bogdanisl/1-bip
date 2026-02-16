// app/bip/index.tsx
import { Colors } from '@/src/constants/theme';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import * as Location from 'expo-location';

import Animated, {
    useSharedValue,
    withSequence,
    withTiming,
    useAnimatedStyle,
    withRepeat,
    cancelAnimation,
    interpolate,
    Easing,
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
import { FAKE_CITIES } from '@/src/constants/data_example';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import { MaterialIcons } from '@expo/vector-icons';

const NUM_DIGITS = 5;



export default function BipFindScreen() {
    const { t } = useTranslation();
    const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
    const [Error, setError] = useState<string | null>(null)

    const [digits, setDigits] = useState<string[]>(Array(NUM_DIGITS).fill(''));
    const [isComplete, setIsComplete] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isSearchingLocation, setIsSearchingLocation] = useState(false);


    const inputRefs = useRef<(TextInput | null)[]>([]);

    const shake = useSharedValue(0);
    const rotation = useSharedValue(0);
    const textProgress = useSharedValue(1);


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shake.value }],
    }));

    useEffect(() => {
        const clearStorage = async () => {
            await AsyncStorage.removeItem('selectedBipIds');
            await AsyncStorage.removeItem('selectedBipCities');
            useSelectedBipStore.getState().setSelectedBip(null);
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
        setError(null)
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

    const triggerError = (message:string) => {
        setError(message);
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
            triggerError(t('no_cities_found_for_code'))
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

    const handleUseLocation = async () => {
        setIsSearchingLocation(true);
        try {
            // Zapytanie o uprawnienia do używania lokalizacji
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Brak uprawnień do lokalizacji');
                return;
            }
            // Pobranie współrzędnych użytkownika
            const location = await Location.getCurrentPositionAsync({});
            //console.log('Współrzędne:', location.coords);

            // Odwrotne geokodowanie - pobranie adresu na podstawie współrzędnych
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Wyświetlenie kodu pocztowego w konsoli
            const postalCodeRaw = address[0]?.postalCode;
            if (postalCodeRaw) {

                const postalCode = postalCodeRaw.replace(/\D/g, '');
                console.log('Kod pocztowy (tylko cyfry):', postalCode);

                // Wypełnienie inputów
                setTimeout(() => {

                    const postalDigits = postalCode.split('').slice(0, NUM_DIGITS); // max 5 cyfr
                    const newDigits = Array(NUM_DIGITS).fill('');
                    postalDigits.forEach((d, i) => {
                        newDigits[i] = d;
                    });
                    setDigits(newDigits);
                    const lastIndex = postalDigits.length - 1;
                    if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
                        inputRefs.current[lastIndex].focus();
                    }
                    setIsSearchingLocation(false);
                }, 500)
            } else {
                console.log('Nie udało się znaleźć kodu pocztowego.');
            }
        } catch (error) {
            setError(t('cant_find_postal_code'));
            
        }
        finally {
            setTimeout(() => {
                setIsSearchingLocation(false);
            }, 500)
        }
    }

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotateZ: `${rotation.value}deg` }],
    }));

    const textStyle = useAnimatedStyle(() => ({
        width: interpolate(textProgress.value, [0, 1], [0, 130]),
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: textProgress.value * 5,
        opacity: textProgress.value,
        height: 20,
        overflow: 'hidden',
    }));


    useEffect(() => {
        if (isSearchingLocation) {
            // Start animacji obracania ikony
            rotation.value = withRepeat(
                withTiming(360, { duration: 1000, easing: Easing.linear }),
                -1,
                false
            );
            // Zwinięcie tekstu
            textProgress.value = withTiming(0, { duration: 300 });
        } else {
            cancelAnimation(rotation);
            rotation.value = 0;
            // Rozwinięcie tekstu
            textProgress.value = withTiming(1, { duration: 300 });
        }
    }, [isSearchingLocation]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.text }]}>{t('enter_postal_code')}</Text>
                    <Text style={[styles.subtitle, { color: theme.subText }]}>
                        {t('enter_postal_code_subtext')}
                    </Text>
                    {/* <Text style={[styles.subtitle, { color: theme.subText, marginTop: 0, marginBottom: 20 }]}>
                        {t('or')}
                    </Text> */}


                    <Animated.View style={[animatedStyle]}>
                        <View style={styles.inputContainer}>
                            {digits.map((digit, index) => (
                                <React.Fragment key={index}>
                                    <TextInput
                                        ref={ref => { inputRefs.current[index] = ref; }}
                                        style={[
                                            styles.inputBox,
                                            Error
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
                    {Error &&
                        <Text style={styles.errorText}>
                            {Error}
                        </Text>
                    }

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderColor: theme.tint,
                            borderWidth: 0,
                            justifyContent: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: theme.background_2,
                            borderRadius: 30,
                            shadowColor: Colors.dark.background,
                            shadowOpacity: 0.2,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                            elevation: 3,
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                        disabled={isSearchingLocation}
                        onPress={handleUseLocation}
                    >
                        <Animated.View style={[iconStyle]}>
                            <MaterialIcons name="gps-fixed" size={20} color={theme.tint} />
                        </Animated.View>
                        <Animated.View style={[textStyle]}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: theme.text,
                                    fontFamily: 'Poppins-Medium',
                                }}
                            >
                                {t('use_gps_location')}
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
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

                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

