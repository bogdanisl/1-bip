import React, { useEffect, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    Linking,
    Platform,
    View,
    Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export const UpdateBanner = () => {
    const { t } = useTranslation();

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0.6)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1.5,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ])
        );

        pulse.start();
    }, []);

    const GOOGLE_PLAY_STORE_LINK =
        'https://play.google.com/store/apps/details?id=com.alpanet.bip_platform';
    const APP_STORE_LINK =
        'https://apps.apple.com/pl/app/1bip/id6757152474';

    return (
        <TouchableOpacity
            style={{ marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            activeOpacity={0.85}
            onPress={() =>
                Linking.openURL(
                    Platform.OS === 'ios' ? APP_STORE_LINK : GOOGLE_PLAY_STORE_LINK
                )
            }
        >
            <LinearGradient
                colors={['#53779a', '#1DB954']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                    padding: 10,
                    paddingBottom: 35,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Poppins-Medium' }}>
                    {t('update_available')}
                </Text>

                <View style={{ marginLeft: 8, justifyContent: 'center', alignItems: 'center' }}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: 'white',
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        }}
                    />
                    <MaterialIcons name="downloading" color="white" size={20} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};