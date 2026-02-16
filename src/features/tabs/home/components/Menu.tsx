import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { router, RelativePathString } from 'expo-router';

interface MenuProps {
  type?: 'top' | 'bottom';
}

export const Menu: React.FC<MenuProps> = ({ type = 'bottom' }) => {
  const { t } = useTranslation();
  const handlePress = (route: RelativePathString) => {
    router.push(route);
  }
  const theme = useColorScheme() == 'dark' ? Colors.dark : Colors.light;
  const { width } = Dimensions.get('screen');

  const menuItems = useMemo(
    () => [
      { title: t('home.categories'), subtitle: t('home.categories_desc'), icon: 'list', route: '/(tabs)/home/categories', badge: 8 },
      { title: t('home.downloads'), subtitle: t('home.downloads_desc'), icon: 'download', route: '/(tabs)/home/documents', badge:1 },
      { title: t('home.office_data'), subtitle: t('home.office_data_desc'), icon: 'account-balance', route: '/(tabs)/home/data' },
      { title: t('home.positions'), subtitle: t('home.positions_desc'), icon: 'work', route: '/(tabs)/home/employees' },
      { title: t('home.bip_editors'), subtitle: t('home.bip_editors_desc'), icon: 'group', route: '/(tabs)/home/editors' },
      { title: t('home.visit_statistics'), subtitle: t('home.visit_statistics_desc'), icon: 'bar-chart', route: '/(tabs)/home/statistics' },
    ],
    [t]
  );

  const displayedItems = useMemo(() => {
    if (type === 'top') {
      return menuItems.slice(0, 2);        // first 2
    }

    if (type === 'bottom') {
      return menuItems.slice(-4);          // last 4
    }

    return menuItems;
  }, [menuItems, type]);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'center' }}>
      {displayedItems.map((item: any, index: number) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.85}
          onPress={() => handlePress(item.route)}
          style={{
            width: (width - 48) / 2,
            height: 130,
            backgroundColor: theme.background_2,
            borderRadius: 20,
            padding: 16,
            justifyContent: 'space-between',
            elevation: 8,
          }}
        >
          {item.badge != null && item.badge > 0 && (
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 28,
              height: 28,
              borderRadius: 25,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 6,
            }}>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>{item.badge}</Text>
            </View>
          )}

          <MaterialIcons name={item.icon as any} size={36} color={theme.tint} />
          <View>
            <Text style={{ fontSize: 15, fontWeight: '700', color: theme.text, marginBottom: 4 }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: theme.icon, lineHeight: 14 }}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
};