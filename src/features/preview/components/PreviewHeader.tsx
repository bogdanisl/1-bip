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
import Logo from '@/assets/images/icon_svg.svg';

import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';

export const PreviewHeader = ({ onSearchPress }: any) => {

    const { i18n, t } = useTranslation();
    const insets = useSafeAreaInsets();
    const selectedBip = useSelectedBipStore((s) => s.selectedBip);

    const date = new Date().toLocaleDateString(i18n.language, { dateStyle: 'full' });
    const dateString = date.charAt(0).toUpperCase() + date.slice(1);

    return (
        <LinearGradient
            colors={['#b50315', '#20313b']}
            start={{ x: 0.2, y: 0.5 }}
            end={{ x: 1, y: 1.3 }}
            style={{ marginTop: -300, paddingHorizontal: 20, paddingBottom: 20, alignItems: 'center', borderRadius:25 }}
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

            <Logo width={140} height={90} fill="white" style={{ marginVertical: 20 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom:30 }}>
                <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', flex: 1, textAlign:'center' }}>
                    {`Witamy w 1BIP.PL`}
                    <Text style={{ fontSize: 15, color: Colors.dark.subText, fontWeight: '600' }}>
                        {`\nSzybki dostęp do Biuletynów Informacji Publicznej. Wszystkie urzędy w jednej aplikacji.`}
                    </Text>
                </Text>
            </View>
        </LinearGradient>
    );
};