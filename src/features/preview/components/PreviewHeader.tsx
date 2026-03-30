import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export const PreviewHeader = ({ theme }: any) => {

    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const isContrastTheme = theme.text == '#ffff00';
    const isMonochromeTheme = theme.background_2 = '#F2F2F2ff'
    return (
        <LinearGradient
            colors={isContrastTheme ? ['#d0c600ff', '#bab700ff'] : [theme.tint, '#20313b']}
            start={{ x: 0.2, y: 0.5 }}
            end={{ x: 1, y: 1.3 }}
            style={{ marginTop: -300, paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center', borderRadius: 25 }}
        >
            <Image
                source={require('@/assets/images/shape.3.50.webp')}
                style={{
                    position: 'absolute',
                    top: 230,
                    left: -50,
                    width: '100%',
                    height: '100%',
                    opacity: 1,
                    transform: [{ rotate: '180deg' }],
                }}
                resizeMode="contain"
            />

            <View
                style={{
                    marginTop: insets.top + 310,
                }}
            />

            {/* <Logo width={140} height={90} fill="white" style={{ marginVertical: 20 }} /> */}
            <Image source={require('@/assets/images/logo3.png')}
                style={{
                    marginVertical: 20,
                    width: 100,
                    height: 100
                }}
                resizeMode='contain'
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color: theme.whiteText, flex: 1, textAlign: 'center' }}>
                    {t('welcome_screen.title')}
                    <Text style={{ fontSize: 15, color: isContrastTheme || isMonochromeTheme ? theme.whiteText : Colors.dark.subText, fontWeight: '600' }}>
                        {t('welcome_screen.desc')}
                    </Text>
                </Text>
            </View>
        </LinearGradient>
    );
};