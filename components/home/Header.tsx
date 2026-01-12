import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Logo from '@/assets/images/icon_svg.svg';

import { useHome } from '@/hooks/use-home';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';

export const Header = ({ onSearchPress }: any) => {

  const { i18n, t } = useTranslation();
  const { officeData, savedBips } = useHome();
  const insets = useSafeAreaInsets();
  const selectedBip = useSelectedBipStore((s) => s.selectedBip);

  const date = new Date().toLocaleDateString(i18n.language, { dateStyle: 'full' });
  const dateString = date.charAt(0).toUpperCase() + date.slice(1);

  return (
    <LinearGradient
      colors={['#b50315', '#20313b']}
      start={{ x: 0, y: 0.4 }}
      end={{ x: 1, y: 1 }}
      style={{ marginTop: -300, paddingHorizontal: 20, paddingBottom: 40 }}
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          marginTop: insets.top + 310,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {savedBips?.length! > 1 && (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/(tabs)/home/sub_pages/bip_selector' })}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.25)',
                paddingHorizontal: 12,
                paddingVertical: 10,
                maxWidth: 200,
                maxHeight: 45,
                borderRadius: 25,
                gap: 6,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ color: 'white', fontSize: 15 }}>{t('change_bip')}</Text>
              <MaterialIcons name="swap-horiz" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={onSearchPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(255,255,255,0.25)',
            paddingLeft: 10,
            paddingRight: 15,
            paddingVertical: 10,
            borderRadius: 25,
          }}
        >
          <MaterialIcons name="search" size={20} color="white" />
          <Text style={{ color: 'white', fontSize: 15 }}>Szukaj</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, marginBottom: 0 }}>
        {dateString}
      </Text>

      <Logo width={90} height={60} fill="white" style={{ marginVertical: 0 }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', flex: 1 }}>
          {officeData?.title || 'Brak danych.'}
          <Text style={{ fontSize: 15, color: Colors.dark.subText, fontWeight: '600' }}>
            {`\n${officeData?.postalCode?.value || ''} ${officeData?.city?.value || ''}\n${officeData?.street?.value || ''}`}
          </Text>
        </Text>

        <View style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', width: 140, height: 140, padding: 80, borderRadius: 90 }}>
          <Image
            source={require('@/assets/images/sphere.1.webp')}
            style={{ width: 140, height: 140, position: 'absolute' }}
            resizeMode="contain"
          />
          <Image
            source={{ uri: selectedBip ? `${selectedBip.url}${officeData?.logo?.src}` : 'https://www.bip.alpanet.pl/resources/global/logo.webp' }}
            style={{ width: 60, height: 60, backgroundColor: 'transparent', borderRadius: 0 }}
            resizeMode="contain"
          />
        </View>
      </View>
    </LinearGradient>
  );
};