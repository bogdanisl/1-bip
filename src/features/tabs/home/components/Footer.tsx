import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import * as Application from 'expo-application'
import { useHome } from '../hooks/use-home';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/src/constants/theme';


export const Footer = ({ theme }: any) => {
  const version = Application.nativeApplicationVersion || '1.0.0'
  const { officeData } = useHome();
  const isContrastTheme = theme.text == '#ffff00';
  const isMonochrome = theme.background_2 == '#F2F2F2ff'
  const bip_version = officeData?.system ? officeData.system.version.toUpperCase() : null
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={isContrastTheme ? ['#d0c600ff', '#bab700ff'] : [theme.tint, '#20313b']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ position: 'absolute', bottom: -220, left: 0, right: 0, height: 430 }}
    >
      <View style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 100, padding: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          {bip_version &&
            <>
              <FontAwesome style={{ marginRight: 5 }} color={isContrastTheme || isMonochrome? theme.background : Colors.dark.subText} size={13} name="code" />
              <Text style={{ textAlign: 'center', color: isContrastTheme || isMonochrome? theme.background : Colors.dark.subText, fontSize: 11, fontWeight: '500' }}>{bip_version}</Text>
            </>
          }
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesome style={{ marginRight: 5 }} color={isContrastTheme || isMonochrome? theme.background : Colors.dark.subText} size={14} name="mobile-phone" />
          <Text style={{ textAlign: 'center', color: isContrastTheme || isMonochrome? theme.background : Colors.dark.subText, fontSize: 11, fontWeight: '500' }}>{t('app_version').toUpperCase()} {version}</Text>
        </View>
      </View>
      <Image
        source={require('@/assets/images/shape.3.50.webp')}
        style={{ position: 'absolute', alignSelf: 'center', top: -90, width: '80%', height: '80%', opacity: 1, transform: [{ rotate: '300deg' }] }}
        resizeMode="contain"
      />
    </LinearGradient>
  );

}