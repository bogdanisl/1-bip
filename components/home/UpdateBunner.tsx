import React, { useState, useMemo } from 'react';
import {
    Text,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export const UpdateBanner = () => {
    const { t } = useTranslation();
    const GOOGLE_PLAY_STORE_LINK =
        'https://play.google.com/store/apps/details?id=com.anonymous.Alpanet&hl=pl';
    const APP_STORE_LINK =
        'https://apps.apple.com/pl/app/alpanet/id6749890567?l=pl';
    return (
        <TouchableOpacity
            style={{ backgroundColor: 'black', marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            activeOpacity={0.5}
            onPress={() => Linking.openURL(Platform.OS === 'ios' ? APP_STORE_LINK : GOOGLE_PLAY_STORE_LINK)}
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
                <MaterialIcons style={{marginLeft:5}} name="downloading" color="white" size={18} />
            </LinearGradient>
        </TouchableOpacity>
    );
}